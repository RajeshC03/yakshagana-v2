package com.yakshagana.websocket;
import com.yakshagana.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled; import org.springframework.stereotype.Service;
import java.time.LocalTime; import java.util.*;
@Service public class ShowBroadcastService {
    @Autowired private SimpMessagingTemplate t; @Autowired private ShowService ss;
    @Scheduled(fixedRate=60000) public void broadcast() {
        var shows = ss.getTonightShows(); Map<String,Object> u=new HashMap<>();
        u.put("type","SCHEDULE_UPDATE"); u.put("count",shows.size()); u.put("timestamp",LocalTime.now().toString());
        u.put("message", shows.isEmpty() ? "No shows scheduled tonight" :
            "🎭 " + shows.get(0).getMelaName() + " performing " + shows.get(0).getPrasanga() + " at " + shows.get(0).getVenue());
        t.convertAndSend("/topic/shows", u);
    }
    public void sendUpdate(String message) {
        Map<String,Object> u=new HashMap<>(); u.put("type","INSTANT_UPDATE");
        u.put("message",message); u.put("timestamp",LocalTime.now().toString());
        t.convertAndSend("/topic/shows", u);
    }
}
