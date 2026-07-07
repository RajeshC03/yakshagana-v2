package com.yakshagana.websocket;
import com.yakshagana.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled; import org.springframework.stereotype.Service;
import java.time.LocalTime; import java.util.*;
@Service public class ShowBroadcastService {
    @Autowired private SimpMessagingTemplate t; @Autowired private ShowService ss;
    // @Scheduled(fixedRate=60000) public void broadcast() {
    //     var shows = ss.getTonightShows(); Map<String,Object> u=new HashMap<>();
    //     u.put("type","SCHEDULE_UPDATE"); u.put("count",shows.size()); u.put("timestamp",LocalTime.now().toString());
    //     u.put("message", shows.isEmpty() ? "No shows scheduled tonight" :
    //         "🎭 " + shows.get(0).getMelaName() + " performing " + shows.get(0).getPrasanga() + " at " + shows.get(0).getVenue());
    //     t.convertAndSend("/topic/shows", u);
    // }

    @Scheduled(fixedRate = 60000)
public void broadcast() {

    var shows = ss.getTonightShows();

    Map<String, Object> u = new HashMap<>();

    u.put("type", "SCHEDULE_UPDATE");
    u.put("count", shows.size());
    u.put("timestamp", LocalTime.now().toString());

    if (shows.isEmpty()) {

        u.put("message", "No shows scheduled tonight");
        u.put("messageKn", "ಇಂದು ರಾತ್ರಿ ಯಾವುದೇ ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಗಳಿಲ್ಲ");

    } else {

        var show = shows.get(0);

        // English
        u.put(
            "message",
            "🎭 "
                + show.getMelaName()
                + " performing "
                + show.getPrasanga()
                + " at "
                + show.getVenue()
        );

        // Kannada
        u.put(
            "messageKn",
            "🎭 "
                + show.getMelaNameKn()
                + " ಪ್ರದರ್ಶಿಸುತ್ತಿದೆ "
                + show.getPrasangaKn()
                + " - "
                + show.getVenueKn()
        );
    }

    t.convertAndSend("/topic/shows", u);
}


    // public void sendUpdate(String message) {
    //     Map<String,Object> u=new HashMap<>(); u.put("type","INSTANT_UPDATE");
    //     u.put("message",message); u.put("timestamp",LocalTime.now().toString());
    //     t.convertAndSend("/topic/shows", u);
    // }

    public void sendUpdate(String message, String messageKn) {

    System.out.println("Broadcasting:");
    System.out.println(message);
    System.out.println(messageKn);


    Map<String,Object> u = new HashMap<>();

    u.put("type","INSTANT_UPDATE");
    u.put("message",message);
    u.put("messageKn",messageKn);
    u.put("timestamp",LocalTime.now().toString());

    t.convertAndSend("/topic/shows",u);
}
}
