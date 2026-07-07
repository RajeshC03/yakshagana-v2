import { useEffect, useState, useRef } from 'react'
import { showsAPI, getLocalToday, extractDate } from '../api'

import { useLanguage } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function useLiveUpdates() {

  const { lang } = useLanguage()
  const [latestUpdate, setLatestUpdate] = useState(null)
  const [updates, setUpdates]           = useState([])
  const tickerRef = useRef(null)

  const instantUpdateRef = useRef(false)

  const addToHistory = (message) => {
    setUpdates(prev => [{ message, timestamp: new Date().toISOString() }, ...prev].slice(0, 10))
  }

  const startTicker = (messages) => {
    if (tickerRef.current) clearInterval(tickerRef.current)
    let index = 0
    const show = () => {
      const msg = { message: messages[index % messages.length], timestamp: new Date().toISOString() }
      setLatestUpdate(msg)
      addToHistory(msg.message)
      index++
    }
    show()
    tickerRef.current = setInterval(show, 6000)
  }

  const fetchTonightShows = async () => {

    if (instantUpdateRef.current) {
    return;
  }

  try {
      const today = getLocalToday()
      const res   = await showsAPI.getAll()
      const shows = res.data.filter(s => extractDate(s.date) === today)

      console.log("Language:", lang)
      console.log('Tonight shows:', shows)

      // if (shows.length > 0) {
      //   const messages = [
      //     `🔴 ${shows.length} show${shows.length > 1 ? 's' : ''} happening tonight · ${today}`,
      //     ...shows.map(s =>
      //       `🎭 Tonight: ${s.prasanga} by ${s.melaName}${s.troupeNo ? ' · ' + s.troupeNo : ''} at ${s.venue} · ${s.startTime}`
      //     )
      //   ]
      //   startTicker(messages)
      // } 
if (shows.length > 0) {

  const messages =
    lang === 'kn'
      ? [
          `🔴 ಇಂದು ರಾತ್ರಿ ${shows.length} ಪ್ರದರ್ಶನಗಳು ನಡೆಯುತ್ತಿವೆ`,

          ...shows.map(s =>
            `🎭 ${s.prasangaKn || s.prasanga} · ${s.mela?.kannadaName || s.melaName} · ${s.venueKn || s.venue} · ${s.startTime}`
          )
        ]
      : [
          `🔴 ${shows.length} show${shows.length > 1 ? 's' : ''} happening tonight · ${today}`,

          ...shows.map(s =>
            `🎭 Tonight: ${s.prasanga} by ${s.melaName}${s.troupeNo ? ' · ' + s.troupeNo : ''} at ${s.venue} · ${s.startTime}`
          )
        ]

  startTicker(messages)
}
      else {
        // setLatestUpdate({ message: `No shows tonight (${today}) · Check upcoming shows`, timestamp: new Date().toISOString() })
        setLatestUpdate({
  message:
    lang === 'kn'
      ? `ಇಂದು ರಾತ್ರಿ ಯಾವುದೇ ಪ್ರದರ್ಶನಗಳಿಲ್ಲ (${today}) · ಮುಂಬರುವ ಪ್ರದರ್ಶನಗಳನ್ನು ನೋಡಿ`
      : `No shows tonight (${today}) · Check upcoming shows`,
  timestamp: new Date().toISOString()
})
      }
    } catch {
      // setLatestUpdate({ message: "Live updates active · Login to see tonight's shows", timestamp: new Date().toISOString() })
      setLatestUpdate({
  message:
    lang === 'kn'
      ? "ನೇರ ನವೀಕರಣಗಳು ಸಕ್ರಿಯವಾಗಿವೆ · ಇಂದಿನ ರಾತ್ರಿ ಪ್ರದರ್ಶನಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ"
      : "Live updates active · Login to see tonight's shows",
  timestamp: new Date().toISOString()
})
    }
  }

  const tryWebSocket = async () => {
    try {
      const SockJS = (await import('sockjs-client')).default
      const Stomp  = (await import('stompjs')).default
      const socket = new SockJS('/ws')
      const client = Stomp.over(socket)
      client.debug = null
      
      client.connect({}, () => {

    console.log("✅ WebSocket Connected");

    client.subscribe('/topic/shows', msg => {

        const data = JSON.parse(msg.body);

        console.log("WEBSOCKET:", data);

        instantUpdateRef.current = true;

        setLatestUpdate(data);

        addToHistory(
            lang === "kn" && data.messageKn
                ? data.messageKn
                : data.message
        );

        setTimeout(() => {
            instantUpdateRef.current = false;
            fetchTonightShows();
        }, 8000);
    });

}, (error) => {
    console.error("❌ WebSocket Error:", error);
});
    } catch { /* fallback to polling */ }
  }

  // useEffect(() => {
  //   fetchTonightShows()
  //   tryWebSocket()
  //   const poll = setInterval(fetchTonightShows, 120000)
  //   return () => {
  //     if (tickerRef.current) clearInterval(tickerRef.current)
  //     clearInterval(poll)
  //   }
  // }, [])

  useEffect(() => {
  fetchTonightShows()
  tryWebSocket()

  const poll = setInterval(fetchTonightShows, 120000)

  return () => {
    if (tickerRef.current) clearInterval(tickerRef.current)
    clearInterval(poll)
  }
}, [lang])

  return { latestUpdate, updates }
}
