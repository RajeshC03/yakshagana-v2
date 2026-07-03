import { useEffect, useState, useRef } from 'react'
import { showsAPI, getLocalToday, extractDate } from '../api'

export default function useLiveUpdates() {
  const [latestUpdate, setLatestUpdate] = useState(null)
  const [updates, setUpdates]           = useState([])
  const tickerRef = useRef(null)

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
    try {
      const today = getLocalToday()
      const res   = await showsAPI.getAll()
      const shows = res.data.filter(s => extractDate(s.date) === today)

      if (shows.length > 0) {
        const messages = [
          `🔴 ${shows.length} show${shows.length > 1 ? 's' : ''} happening tonight · ${today}`,
          ...shows.map(s =>
            `🎭 Tonight: ${s.prasanga} by ${s.melaName}${s.troupeNo ? ' · ' + s.troupeNo : ''} at ${s.venue} · ${s.startTime}`
          )
        ]
        startTicker(messages)
      } else {
        setLatestUpdate({ message: `No shows tonight (${today}) · Check upcoming shows`, timestamp: new Date().toISOString() })
      }
    } catch {
      setLatestUpdate({ message: "Live updates active · Login to see tonight's shows", timestamp: new Date().toISOString() })
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
        client.subscribe('/topic/shows', msg => {
          const data = JSON.parse(msg.body)
          if (data.message) {
            addToHistory(data.message)
            fetchTonightShows()
          }
        })
      })
    } catch { /* fallback to polling */ }
  }

  useEffect(() => {
    fetchTonightShows()
    tryWebSocket()
    const poll = setInterval(fetchTonightShows, 120000)
    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current)
      clearInterval(poll)
    }
  }, [])

  return { latestUpdate, updates }
}
