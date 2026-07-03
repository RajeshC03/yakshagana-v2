package com.yakshagana.config;

import com.yakshagana.model.*;
import com.yakshagana.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private MelaRepository mr;
    @Autowired private ShowRepository sr;
    @Autowired private PrasangaRepository pr;

    @Override
    public void run(String... args) {

        if (mr.count() > 0) {
            System.out.println("✅ DB has data — skipping seed.");
            updateTonightDatesToToday();
            return;
        }

        System.out.println("🌱 Seeding all melas...");

        // ── 6 FAMOUS MELAS (isFamous = true → shown before login) ─────────
        // Mela m1 = mela("Kateel Mela","ಕಟೀಲು ಮೇಳ",
        //     "Kateelu Sri Durgaparameshwari Prasadita Dashavatara Yakshagana Mandali",
        //     "Dakshina Kannada","Kateel, Dakshina Kannada","Tenkutittu",7,"~1825",
        //     "Sri Durgaparameshwari",
        //     "The most celebrated Yakshagana institution with 7 touring troupes making it the largest in Karnataka.",
        //     "ಏಳು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಯಕ್ಷಗಾನ ಸಂಸ್ಥೆ, ಇದು ಕರ್ನಾಟಕದ ಅತಿ ದೊಡ್ಡ ಮೇಳವಾಗಿದೆ.",
        //     58,"#8B1A1A",true,
        //     Arrays.asList("Kalladi Deviprasad Shetty","Kuriya Vittala Shastri"),
        //     Arrays.asList("Sri Devi Mahatme","Karna Parva"));

        Mela m1 = mela(
    "Kateel Mela",
    "ಕಟೀಲು ಮೇಳ",

    "Kateelu Sri Durgaparameshwari Prasadita Dashavatara Yakshagana Mandali",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Kateel, Dakshina Kannada",
    "ಕಟೀಲು, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    7,

    "~1825",

    "Sri Durgaparameshwari",
    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ",

    "The most celebrated Yakshagana institution with 7 touring troupes making it the largest in Karnataka.",

    "ಏಳು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಯಕ್ಷಗಾನ ಸಂಸ್ಥೆ, ಇದು ಕರ್ನಾಟಕದ ಅತಿ ದೊಡ್ಡ ಮೇಳವಾಗಿದೆ.",

    58,

    "#8B1A1A",

    true,

    Arrays.asList(
        "Kalladi Deviprasad Shetty",
        "Kuriya Vittala Shastri"
    ),

    Arrays.asList(
        "ಕಲ್ಲಾಡಿ ದೇವಿಪ್ರಸಾದ್ ಶೆಟ್ಟಿ",
        "ಕುರಿಯ ವಿಠಲ ಶಾಸ್ತ್ರಿ"
    ),

    Arrays.asList(
        "Sri Devi Mahatme",
        "Karna Parva"
    ),

    Arrays.asList(
        "ದೇವಿ ಮಹಾತ್ಮೆ",
        "ಕರ್ಣ ಪರ್ವ"
    )
);

        // Mela m2 = mela("Dharmasthala Mela","ಧರ್ಮಸ್ಥಳ ಮೇಳ",
        //     "Dharmasthala Manjunatheswara Krupaposhita Yakshagana Mandali",
        //     "Dakshina Kannada","Dharmasthala, Dakshina Kannada","Tenkutittu",2,"1925",
        //     "Sri Manjunatha",
        //     "One of the oldest and most prestigious troupes sponsored by the Dharmasthala temple.",
        //     "ಧರ್ಮಸ್ಥಳ ದೇವಸ್ಥಾನದಿಂದ ಪ್ರಾಯೋಜಿತವಾದ ಅತ್ಯಂತ ಹಳೆಯ ಮತ್ತು ಪ್ರತಿಷ್ಠಿತ ಮೇಳಗಳಲ್ಲಿ ಒಂದು.",
        //     45,"#1A1F5C",true,
        //     Arrays.asList("Balipa Narayana Bhagavatha","Kukkunaje Balipa"),
        //     Arrays.asList("Mahabharata Sangraha","Draupadi Vasthrapaharana"));

        // Mela m3 = mela("Saligrama Mela","ಸಾಲಿಗ್ರಾಮ ಮೇಳ",
        //     "Saligrama Sri Veeranarayan Krupaposhita Yakshagana Mandali",
        //     "Udupi","Saligrama, Udupi","Badagutittu",1,"1890",
        //     "Sri Guru Narasimha",
        //     "A legendary troupe credited with pioneering the modern tent-show format.",
        //     "ಆಧುನಿಕ ಟೆಂಟ್ ಪ್ರದರ್ಶನ ಮಾದರಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿದ ಖ್ಯಾತಿಯ ಪ್ರಸಿದ್ಧ ಮೇಳ.",
        //     40,"#2D6A2D",true,
        //     Arrays.asList("Kota Shivaram Karanth","Chittani Ramachandra Hegde"),
        //     Arrays.asList("Pandava Vijaya","Rama Pattabisheka"));

        // Mela m4 = mela("Mandarthi Mela","ಮಂದಾರ್ತಿ ಮೇಳ",
        //     "Mandarthi Sri Durgaparameshwari Yakshagana Mandali",
        //     "Udupi","Mandarthi, Udupi","Badagutittu",5,"~1880",
        //     "Sri Durgaparameshwari",
        //     "One of the largest organizations with 5 touring troupes.",
        //     "ಐದು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತಿ ದೊಡ್ಡ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಒಂದು.",
        //     52,"#5C4B0E",true,
        //     Arrays.asList("Mandarthi Rathnakar Hegde"),
        //     Arrays.asList("Devi Mahatme","Subramanya Vijaya"));

        // Mela m5 = mela("Idagunji Mela","ಇಡಗುಂಜಿ ಮೇಳ",
        //     "Idagunji Mahaganapati Yakshagana Mandali",
        //     "Uttara Kannada","Idagunji, Uttara Kannada","Badagutittu",1,"1960",
        //     "Sri Mahaganapati",
        //     "Premier troupe of the Badagutittu style. Founded by Keremane Shivarama Hegde.",
        //     "ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಪ್ರಮುಖ ಮೇಳ. ಕೆರೆಮನೆ ಶಿವರಾಮ ಹೆಗ್ಡೆಯವರಿಂದ ಸ್ಥಾಪಿತ.",
        //     38,"#0E3D5C",true,
        //     Arrays.asList("Keremane Shivarama Hegde","Keremane Shambhu Hegde"),
        //     Arrays.asList("Srikrishna Sandhana","Vali Vadhe"));

        // Mela m6 = mela("Perduru Mela","ಪೆರ್ಡೂರು ಮೇಳ",
        //     "Perduru Sri Mahalingeshwara Krupaposhita Yakshagana Mandali",
        //     "Udupi","Perduru, Udupi","Badagutittu",1,"1935",
        //     "Sri Mahalingeshwara",
        //     "A respected Badagutittu troupe from Kundapura region.",
        //     "ಕುಂದಾಪುರ ಪ್ರಾಂತ್ಯದ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಮೇಳ.",
        //     35,"#3D0E5C",true,
        //     Arrays.asList("Perduru Ganapati Bhat"),
        //     Arrays.asList("Mahalingeshwara Mahatme","Bheema Pratijnye"));

        Mela m2 = mela(
    "Dharmasthala Mela",
    "ಧರ್ಮಸ್ಥಳ ಮೇಳ",

    "Dharmasthala Manjunatheswara Krupaposhita Yakshagana Mandali",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Dharmasthala, Dakshina Kannada",
    "ಧರ್ಮಸ್ಥಳ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    2,

    "1925",

    "Sri Manjunatha",
    "ಶ್ರೀ ಮಂಜುನಾಥ",

    "One of the oldest and most prestigious troupes sponsored by the Dharmasthala temple.",

    "ಧರ್ಮಸ್ಥಳ ದೇವಸ್ಥಾನದಿಂದ ಪ್ರಾಯೋಜಿತವಾದ ಅತ್ಯಂತ ಹಳೆಯ ಮತ್ತು ಪ್ರತಿಷ್ಠಿತ ಮೇಳಗಳಲ್ಲಿ ಒಂದು.",

    45,

    "#1A1F5C",

    true,

    Arrays.asList(
        "Balipa Narayana Bhagavatha",
        "Kukkunaje Balipa"
    ),

    Arrays.asList(
        "ಬಾಳಿಪ ನಾರಾಯಣ ಭಾಗವತ",
        "ಕುಕ್ಕುನಜೆ ಬಾಳಿಪ"
    ),

    Arrays.asList(
        "Mahabharata Sangraha",
        "Draupadi Vasthrapaharana"
    ),

    Arrays.asList(
        "ಮಹಾಭಾರತ ಸಂಗ್ರಹ",
        "ದ್ರೌಪದಿ ವಸ್ತ್ರಾಪಹರಣ"
    )
);

Mela m3 = mela(
    "Saligrama Mela",
    "ಸಾಲಿಗ್ರಾಮ ಮೇಳ",

    "Saligrama Sri Veeranarayan Krupaposhita Yakshagana Mandali",

    "Udupi",
    "ಉಡುಪಿ",

    "Saligrama, Udupi",
    "ಸಾಲಿಗ್ರಾಮ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "1890",

    "Sri Guru Narasimha",
    "ಶ್ರೀ ಗುರು ನರಸಿಂಹ",

    "A legendary troupe credited with pioneering the modern tent-show format.",

    "ಆಧುನಿಕ ಟೆಂಟ್ ಪ್ರದರ್ಶನ ಮಾದರಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿದ ಖ್ಯಾತಿಯ ಪ್ರಸಿದ್ಧ ಮೇಳ.",

    40,

    "#2D6A2D",

    true,

    Arrays.asList(
        "Kota Shivaram Karanth",
        "Chittani Ramachandra Hegde"
    ),

    Arrays.asList(
        "ಕೋಟ ಶಿವರಾಮ ಕಾರಂತ",
        "ಚಿಟ್ಟಾಣಿ ರಾಮಚಂದ್ರ ಹೆಗಡೆ"
    ),

    Arrays.asList(
        "Pandava Vijaya",
        "Rama Pattabisheka"
    ),

    Arrays.asList(
        "ಪಾಂಡವ ವಿಜಯ",
        "ರಾಮ ಪಟ್ಟಾಭಿಷೇಕ"
    )
);

Mela m4 = mela(
    "Mandarthi Mela",
    "ಮಂದಾರ್ತಿ ಮೇಳ",

    "Mandarthi Sri Durgaparameshwari Yakshagana Mandali",

    "Udupi",
    "ಉಡುಪಿ",

    "Mandarthi, Udupi",
    "ಮಂದಾರ್ತಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    5,

    "~1880",

    "Sri Durgaparameshwari",
    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ",

    "One of the largest organizations with 5 touring troupes.",

    "ಐದು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತಿ ದೊಡ್ಡ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಒಂದು.",

    52,

    "#5C4B0E",

    true,

    Arrays.asList(
        "Mandarthi Rathnakar Hegde"
    ),

    Arrays.asList(
        "ಮಂದಾರ್ತಿ ರತ್ನಾಕರ ಹೆಗಡೆ"
    ),

    Arrays.asList(
        "Devi Mahatme",
        "Subramanya Vijaya"
    ),

    Arrays.asList(
        "ದೇವಿ ಮಹಾತ್ಮೆ",
        "ಸುಬ್ರಹ್ಮಣ್ಯ ವಿಜಯ"
    )
);

Mela m5 = mela(
    "Idagunji Mela",
    "ಇಡಗುಂಜಿ ಮೇಳ",

    "Idagunji Mahaganapati Yakshagana Mandali",

    "Uttara Kannada",
    "ಉತ್ತರ ಕನ್ನಡ",

    "Idagunji, Uttara Kannada",
    "ಇಡಗುಂಜಿ, ಉತ್ತರ ಕನ್ನಡ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "1960",

    "Sri Mahaganapati",
    "ಶ್ರೀ ಮಹಾಗಣಪತಿ",

    "Premier troupe of the Badagutittu style. Founded by Keremane Shivarama Hegde.",

    "ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಪ್ರಮುಖ ಮೇಳ. ಕೆರೆಮನೆ ಶಿವರಾಮ ಹೆಗಡೆಯವರಿಂದ ಸ್ಥಾಪಿತ.",

    38,

    "#0E3D5C",

    true,

    Arrays.asList(
        "Keremane Shivarama Hegde",
        "Keremane Shambhu Hegde"
    ),

    Arrays.asList(
        "ಕೆರೆಮನೆ ಶಿವರಾಮ ಹೆಗಡೆ",
        "ಕೆರೆಮನೆ ಶಂಭು ಹೆಗಡೆ"
    ),

    Arrays.asList(
        "Srikrishna Sandhana",
        "Vali Vadhe"
    ),

    Arrays.asList(
        "ಶ್ರೀಕೃಷ್ಣ ಸಂಧಾನ",
        "ವಾಲಿ ವಧೆ"
    )
);

Mela m6 = mela(
    "Perduru Mela",
    "ಪೆರ್ಡೂರು ಮೇಳ",

    "Perduru Sri Mahalingeshwara Krupaposhita Yakshagana Mandali",

    "Udupi",
    "ಉಡುಪಿ",

    "Perduru, Udupi",
    "ಪೆರ್ಡೂರು, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "1935",

    "Sri Mahalingeshwara",
    "ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ",

    "A respected Badagutittu troupe from Kundapura region.",

    "ಕುಂದಾಪುರ ಪ್ರದೇಶದ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಮೇಳ.",

    35,

    "#3D0E5C",

    true,

    Arrays.asList(
        "Perduru Ganapati Bhat"
    ),

    Arrays.asList(
        "ಪೆರ್ಡೂರು ಗಣಪತಿ ಭಟ್"
    ),

    Arrays.asList(
        "Mahalingeshwara Mahatme",
        "Bheema Pratijnye"
    ),

    Arrays.asList(
        "ಮಹಾಲಿಂಗೇಶ್ವರ ಮಹಾತ್ಮೆ",
        "ಭೀಮ ಪ್ರತಿಜ್ಞೆ"
    )
);

        // ── 23 ADDITIONAL MELAS (isFamous = false → shown only after login) ──
        // 
        
        Mela u1 = mela(
    "Goligaradi Mela",
    "ಗೋಳಿಗರಡಿ ಮೇಳ",

    "Sri Kshetra Goligaradi Yakshagana Mela",

    "Udupi",
    "ಉಡುಪಿ",

    "Goligaradi, Udupi",
    "ಗೋಳಿಗರಡಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Sri Panchurli and Sri Mahashakti Chowdeshwari",
    "ಶ್ರೀ ಪಂಚುರ್ಲಿ ಮತ್ತು ಶ್ರೀ ಮಹಾಶಕ್ತಿ ಚೌಡೇಶ್ವರಿ",

    "A renowned, divine panchapada Yakshagana troupe (mela) based in the coastal region of Karnataka, specifically associated with the holy Sri Kshetra Goligaradi in Sasthan, Udupi district.",

    "ಕರ್ನಾಟಕದ ಕರಾವಳಿ ಪ್ರದೇಶದಲ್ಲಿರುವ ಪ್ರಸಿದ್ಧ, ದೈವಿಕ ಪಂಚಪದ ಯಕ್ಷಗಾನ ಮೇಳ, ಇದು ಉಡುಪಿ ಜಿಲ್ಲೆಯ ಸಾಸ್ತಾನದಲ್ಲಿರುವ ಪವಿತ್ರ ಶ್ರೀ ಕ್ಷೇತ್ರ ಗೋಳಿಗರಡಿಯೊಂದಿಗೆ ನಿರ್ದಿಷ್ಟವಾಗಿ ಸಂಬಂಧ ಹೊಂದಿದೆ.",

    180,

    "#C0392B",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u2 = mela(
    "Maranakatte Mela",
    "ಮಾರಣಕಟ್ಟೆ ಮೇಳ",

    "Sri Kshetra Maranakatte Sri Brahmalingeshwara Dashavatara Yakshagana Mela",

    "Udupi",
    "ಉಡುಪಿ",

    "Maranakatte, Udupi",
    "ಮಾರಣಕಟ್ಟೆ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    3,

    "Ancient Heritage",

    "Lord Shri Brahmalingeshwara",
    "ಶ್ರೀ ಬ್ರಹ್ಮಲಿಂಗೇಶ್ವರ",

    "A highly revered, ancient temple-based Yakshagana dance-drama troupe operating under the Badagu Thittu (Northern) style of performance.",

    "ಬಡಗು ತಿಟ್ಟು (ಉತ್ತರ) ಶೈಲಿಯಡಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಅತ್ಯಂತ ಪೂಜ್ಯ, ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ ಆಧಾರಿತ ಯಕ್ಷಗಾನ ನೃತ್ಯ-ನಾಟಕ ಮೇಳ.",

    540,

    "#D35400",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u3 = mela(
    "Siganduru Mela",
    "ಸಿಗಂದೂರು ಮೇಳ",

    "Sri Chowdeshwari Krupaposhitha Yakshagana Mandali",

    "Shivamogga",
    "ಶಿವಮೊಗ್ಗ",

    "Siganduru, Shivamogga",
    "ಸಿಗಂದೂರು, ಶಿವಮೊಗ್ಗ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "1990",

    "Sri Siganduru Chowdeshwari",
    "ಶ್ರೀ ಸಿಗಂದೂರು ಚೌಡೇಶ್ವರಿ",

    "A prominent Badagutittu-style touring troupe dedicated to performing the sacred history and mythological stories of Goddess Chowdeshwari across Karnataka.",

    "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಚೌಡೇಶ್ವರಿ ದೇವಿಯ ಪವಿತ್ರ ಇತಿಹಾಸ ಮತ್ತು ಪುರಾಣ ಕಥೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಸಮರ್ಪಿತವಾದ ಪ್ರಮುಖ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",

    150,

    "#E67E22",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u4 = mela(
    "Somavara Santhe Mela/Shri Gutyamma Mela",
    "ಸೋಮವಾರ ಸಂತೆ ಮೇಳ/ಶ್ರೀ ಗುತ್ಯಮ್ಮ ಮೇಳ",

    "Shri Kshethra Somavarasanthe Mela",

    "Shivamogga",
    "ಶಿವಮೊಗ್ಗ",

    "Teerthahalli, Shivamogga",
    "ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Undocumented",

    "Shri Guttiyamma",
    "ಶ್ರೀ ಗುಟ್ಟಿಯಮ್ಮ",

    "The festival hosts invited, top-tier Badagutittu-style touring troupes to perform classical, overnight mythological dance-dramas for the public during its core festival days.",

    "ಈ ಜಾತ್ರೆಯು ಆಹ್ವಾನಿತ, ಉನ್ನತ ಮಟ್ಟದ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳಗಳನ್ನು ತನ್ನ ಪ್ರಮುಖ ಜಾತ್ರಾ ದಿನಗಳಲ್ಲಿ ಸಾರ್ವಜನಿಕರಿಗಾಗಿ ಶಾಸ್ತ್ರೀಯ, ರಾತ್ರಿಯಿಡೀ ಪುರಾಣ ನೃತ್ಯ-ನಾಟಕಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಆಹ್ವಾನಿಸುತ್ತದೆ.",

    0,

    "#F39C12",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u5 = mela(
    "Mekkekatte Mela",
    "ಮೆಕ್ಕೆಕಟ್ಟೆ ಮೇಳ",

    "Sri Nandikeshwara Prasadita Yakshagana Mandali, Mekkekattu",

    "Udupi",
    "ಉಡುಪಿ",

    "Mekkekatte, Udupi",
    "ಮೆಕ್ಕೆಕಟ್ಟೆ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "2023",

    "Lord Nandikeshwara",
    "ಶ್ರೀ ನಂದಿಕೇಶ್ವರ",

    "A newly elevated, elite Badagutittu-style touring troupe that stages highly demanded overnight commercial tent shows and public vow performances across coastal Karnataka.",

    "ಕರಾವಳಿ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹೆಚ್ಚು ಬೇಡಿಕೆಯಿರುವ ರಾತ್ರಿಯಿಡೀ ವಾಣಿಜ್ಯ ಟೆಂಟ್ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹರಕೆ ಪ್ರದರ್ಶನಗಳನ್ನು ನಡೆಸುವ ಹೊಸದಾಗಿ ಉನ್ನತೀಕರಿಸಿದ, ಗಣ್ಯ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#27AE60",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

        // Mela u6 = mela("Haladi Mela","ಹಾಲಾಡಿ ಮೇಳ",
        //     "Sri Mahalingeshwara Krupaposhitha Yakshagana Mandali, Haladi","Udupi","Haladi, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Lord Sri Mahalingeshwara",
        //     "A highly celebrated, traditional Badagutittu-style touring mela famous for its localized Kundapur Kannada dialogues and spectacular musical renditions of classical mythological plays.",
        //     "ತನ್ನ ಸ್ಥಳೀಯ ಕುಂದಾಪುರ ಕನ್ನಡ ಸಂಭಾಷಣೆಗಳು ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ಪುರಾಣ ನಾಟಕಗಳ ಅದ್ಭುತ ಸಂಗೀತ ಪ್ರಸ್ತುತಿಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",
        //     180,"#16A085",false,new ArrayList<>(),new ArrayList<>());

        // Mela u7 = mela("Madamakki Mela","ಮಡಮಕ್ಕಿ ಮೇಳ",
        //     "Shri Veerabhadraswamy Dashavatara Yakshagana Mandali, Madamakki","Udupi","Madamakki, Udupi","Badagutittu",1,"2014",
        //     "Lord Sri Veerabhadraswamy",
        //     "A widely respected Badagutittu-style touring troupe celebrated for its high-energy performances, masterful comic acts, and viral modern hits.",
        //     "ಅದರ ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ಪ್ರದರ್ಶನಗಳು, ಪ್ರವೀಣ ಹಾಸ್ಯ ಅಭಿನಯ ಮತ್ತು ಜನಪ್ರಿಯ ಆಧುನಿಕ ಯಶಸ್ಸುಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",
        //     180,"#1ABC9C",false,new ArrayList<>(),new ArrayList<>());

        // Mela u8 = mela("Kota Amrutheshwari Mela","ಕೋಟ ಅಮೃತೇಶ್ವರಿ ಮೇಳ",
        //     "Shri Amrutheshwari Krupaposhitha Yakshagana Mandali, Kota","Udupi","Kota, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Goddess Amrutheshwari",
        //     "A widely respected, traditional Badagutittu-style temple troupe specializing in authentic, classical coastal mythology and powerful vow-fulfillment (Harake) performances.",
        //     "ಅಧಿಕೃತ, ಶಾಸ್ತ್ರೀಯ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಬಲಿಷ್ಠ ಹರಕೆ ಪ್ರದರ್ಶನಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#2980B9",false,new ArrayList<>(),new ArrayList<>());

        // Mela u9 = mela("Neelavara Mela","ನೀಲಾವರ ಮೇಳ",
        //     "Shri Mahishamardini Krupaposhitha Yakshagana Mandali, Neelavara","Udupi","Neelavara, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Goddess Shri Mahishamardini",
        //     "A prestigious, traditional Badagutittu-style temple troupe renowned for presenting authentic coastal mythology and highly sought-after vow-fulfillment (Harake) overnight plays.",
        //     "ಅಧಿಕೃತ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಹೆಚ್ಚು ಬೇಡಿಕೆಯಿರುವ ಹರಕೆ ರಾತ್ರಿ ನಾಟಕಗಳನ್ನು ಪ್ರಸ್ತುತಪಡಿಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಪ್ರತಿಷ್ಠಿತ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#3498DB",false,new ArrayList<>(),new ArrayList<>());

        // Mela u10 = mela("Soukooru Mela","ಸೌಕೂರು ಮೇಳ",
        //     "Sri Durgaparameshwari Krupaposhitha Yakshagana Mandali, Soukooru","Udupi","Soukooru, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Goddess Sri Durgaparameshwari",
        //     "A highly esteemed Badagutittu-style temple mela managed under the legendary Kishen Hegde banner, famous for its rich classical presentation and stellar seasonal tours.",
        //     "ಪ್ರಸಿದ್ಧ ಕಿಶನ್ ಹೆಗ್ಡೆ ಬ್ಯಾನರ್ ಅಡಿಯಲ್ಲಿ ನಿರ್ವಹಿಸಲ್ಪಡುವ, ಅದರ ಶ್ರೀಮಂತ ಶಾಸ್ತ್ರೀಯ ಪ್ರಸ್ತುತಿ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಋತುಮಾನ ಪ್ರವಾಸಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#5DADE2",false,new ArrayList<>(),new ArrayList<>());

        Mela u6 = mela(
    "Haladi Mela",
    "ಹಾಲಾಡಿ ಮೇಳ",

    "Sri Mahalingeshwara Krupaposhitha Yakshagana Mandali, Haladi",

    "Udupi",
    "ಉಡುಪಿ",

    "Haladi, Udupi",
    "ಹಾಲಾಡಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Mahalingeshwara",
    "ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ",

    "A highly celebrated, traditional Badagutittu-style touring mela famous for its localized Kundapur Kannada dialogues and spectacular musical renditions of classical mythological plays.",

    "ತನ್ನ ಸ್ಥಳೀಯ ಕುಂದಾಪುರ ಕನ್ನಡ ಸಂಭಾಷಣೆಗಳು ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ಪುರಾಣ ನಾಟಕಗಳ ಅದ್ಭುತ ಸಂಗೀತ ಪ್ರಸ್ತುತಿಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#16A085",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u7 = mela(
    "Madamakki Mela",
    "ಮಡಮಕ್ಕಿ ಮೇಳ",

    "Shri Veerabhadraswamy Dashavatara Yakshagana Mandali, Madamakki",

    "Udupi",
    "ಉಡುಪಿ",

    "Madamakki, Udupi",
    "ಮಡಮಕ್ಕಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "2014",

    "Lord Sri Veerabhadraswamy",
    "ಶ್ರೀ ವೀರಭದ್ರಸ್ವಾಮಿ",

    "A widely respected Badagutittu-style touring troupe celebrated for its high-energy performances, masterful comic acts, and viral modern hits.",

    "ಅದರ ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ಪ್ರದರ್ಶನಗಳು, ಪ್ರವೀಣ ಹಾಸ್ಯ ಅಭಿನಯ ಮತ್ತು ಜನಪ್ರಿಯ ಆಧುನಿಕ ಯಶಸ್ಸುಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#1ABC9C",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u8 = mela(
    "Kota Amrutheshwari Mela",
    "ಕೋಟ ಅಮೃತೇಶ್ವರಿ ಮೇಳ",

    "Shri Amrutheshwari Krupaposhitha Yakshagana Mandali, Kota",

    "Udupi",
    "ಉಡುಪಿ",

    "Kota, Udupi",
    "ಕೋಟ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Amrutheshwari",
    "ಶ್ರೀ ಅಮೃತೇಶ್ವರಿ ದೇವಿ",

    "A widely respected, traditional Badagutittu-style temple troupe specializing in authentic, classical coastal mythology and powerful vow-fulfillment (Harake) performances.",

    "ಅಧಿಕೃತ, ಶಾಸ್ತ್ರೀಯ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಬಲಿಷ್ಠ ಹರಕೆ ಪ್ರದರ್ಶನಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#2980B9",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u9 = mela(
    "Neelavara Mela",
    "ನೀಲಾವರ ಮೇಳ",

    "Shri Mahishamardini Krupaposhitha Yakshagana Mandali, Neelavara",

    "Udupi",
    "ಉಡುಪಿ",

    "Neelavara, Udupi",
    "ನೀಲಾವರ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Shri Mahishamardini",
    "ಶ್ರೀ ಮಹಿಷಮರ್ಧಿನಿ ದೇವಿ",

    "A prestigious, traditional Badagutittu-style temple troupe renowned for presenting authentic coastal mythology and highly sought-after vow-fulfillment (Harake) overnight plays.",

    "ಅಧಿಕೃತ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಹೆಚ್ಚು ಬೇಡಿಕೆಯಿರುವ ಹರಕೆ ರಾತ್ರಿ ನಾಟಕಗಳನ್ನು ಪ್ರಸ್ತುತಪಡಿಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಪ್ರತಿಷ್ಠಿತ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#3498DB",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u10 = mela(
    "Soukooru Mela",
    "ಸೌಕೂರು ಮೇಳ",

    "Sri Durgaparameshwari Krupaposhitha Yakshagana Mandali, Soukooru",

    "Udupi",
    "ಉಡುಪಿ",

    "Soukooru, Udupi",
    "ಸೌಕೂರು, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Sri Durgaparameshwari",
    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ",

    "A highly esteemed Badagutittu-style temple mela managed under the legendary Kishen Hegde banner, famous for its rich classical presentation and stellar seasonal tours.",

    "ಪ್ರಸಿದ್ಧ ಕಿಶನ್ ಹೆಗ್ಡೆ ಬ್ಯಾನರ್ ಅಡಿಯಲ್ಲಿ ನಿರ್ವಹಿಸಲ್ಪಡುವ, ಅದರ ಶ್ರೀಮಂತ ಶಾಸ್ತ್ರೀಯ ಪ್ರಸ್ತುತಿ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಋತುಮಾನ ಪ್ರವಾಸಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#5DADE2",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

        // Mela u11 = mela("Hiriyadka Mela","ಹಿರಿಯಡ್ಕ ಮೇಳ",
        //     "Sri Veerabhadra Swami Dashavatara Yakshagana Mandali, Hiriyadka","Udupi","Hiriyadka, Udupi","Badagutittu",1,"2008",
        //     "Lord Sri Veerabhadra Swamy",
        //     "A legendary temple troupe following the traditional Badagutittu style, heavily celebrated for staging classical overnight field dramas filled with powerful percussive music.",
        //     "ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯನ್ನು ಅನುಸರಿಸುವ ಪ್ರಸಿದ್ಧ ದೇವಸ್ಥಾನ ಮೇಳ, ಬಲಿಷ್ಠ ತಾಳವಾದ್ಯ ಸಂಗೀತದಿಂದ ತುಂಬಿದ ಶಾಸ್ತ್ರೀಯ ರಾತ್ರಿ ಮೈದಾನ ನಾಟಕಗಳಿಗೆ ಬಹಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.",
        //     180,"#8E44AD",false,new ArrayList<>(),new ArrayList<>());

        // Mela u12 = mela("Hattiyangadi Mela","ಹಟ್ಟಿಯಂಗಡಿ ಮೇಳ",
        //     "Sri Siddhivinayaka Krupaposhitha Yakshagana Mandali, Hattiyangadi","Udupi","Hattiyangadi, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Lord Sri Siddhivinayaka",
        //     "A highly traditional, single-ensemble Badagutittu-style temple troupe renowned for executing powerful vow-fulfillment (Harake) field dramas across coastal districts.",
        //     "ಕರಾವಳಿ ಜಿಲ್ಲೆಗಳಾದ್ಯಂತ ಬಲಿಷ್ಠ ಹರಕೆ ಮೈದಾನ ನಾಟಕಗಳನ್ನು ನಡೆಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಸಾಂಪ್ರದಾಯಿಕ, ಏಕೈಕ ತಂಡದ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#9B59B6",false,new ArrayList<>(),new ArrayList<>());

        // Mela u13 = mela("Kamalashile Mela","ಕಮಲಶಿಲೆ ಮೇಳ",
        //     "Shri Brahmi Durgaparameshwari Kripaposhita Yakshagana Mandali, Kamalashile","Udupi","Kamalashile, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Goddess Shri Brahmi Durgaparameshwari",
        //     "A widely celebrated, elite Badagutittu-style temple troupe renowned for executing powerful, devotional vow-fulfillment (Harake) overnight plays across coastal and Malnad regions.",
        //     "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಪ್ರದೇಶಗಳಾದ್ಯಂತ ಬಲಿಷ್ಠ, ಭಕ್ತಿಪೂರ್ಣ ಹರಕೆ ರಾತ್ರಿ ನಾಟಕಗಳನ್ನು ನಡೆಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಪ್ರಸಿದ್ಧ, ಗಣ್ಯ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#AF7AC5",false,new ArrayList<>(),new ArrayList<>());

        // Mela u14 = mela("Kalavadi Mela","ಕಳವಾಡಿ ಮೇಳ",
        //     "Sri Eshwara Marikamba Prasadita Yakshagana Mandali, Kalavadi (Byndoor)","Udupi","Kalavadi, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Lord Sri Eshwara and Goddess Sri Marikamba",
        //     "A local festival-centric performance tradition that hosts invited, premier Badagutittu-style touring troupes to stage grand overnight mythological plays during the temple's annual congregation.",
        //     "ದೇವಸ್ಥಾನದ ವಾರ್ಷಿಕ ಜಾತ್ರೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಭವ್ಯ ರಾತ್ರಿ ಪುರಾಣ ನಾಟಕಗಳನ್ನು ನಡೆಸಲು ಆಹ್ವಾನಿತ, ಪ್ರಮುಖ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳಗಳನ್ನು ಆಹ್ವಾನಿಸುವ ಸ್ಥಳೀಯ ಜಾತ್ರಾ-ಕೇಂದ್ರಿತ ಪ್ರದರ್ಶನ ಪರಂಪರೆ.",
        //     5,"#6C3483",false,new ArrayList<>(),new ArrayList<>());

        // Mela u15 = mela("Sooralu Mela","ಸೂರಾಲು ಮೇಳ",
        //     "Sri Mahalingeshwara Krupaposhitha Yakshagana Mandali, Sooralu","Udupi","Sooralu, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Lord Sri Mahalingeshwara",
        //     "A traditional Badagutittu-style touring temple troupe celebrated for its classical performance structure, heavy usage of the Chande drum, and enacting rich, legendary mythological plays.",
        //     "ಅದರ ಶಾಸ್ತ್ರೀಯ ಪ್ರದರ್ಶನ ರಚನೆ, ಚಂಡೆ ವಾದ್ಯದ ಹೆಚ್ಚಿನ ಬಳಕೆ, ಮತ್ತು ಶ್ರೀಮಂತ, ಪ್ರಸಿದ್ಧ ಪುರಾಣ ನಾಟಕಗಳ ಅಭಿನಯಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#7D6608",false,new ArrayList<>(),new ArrayList<>());

        // Mela u16 = mela("Shanishwara Mela","ಶನೀಶ್ವರ ಮೇಳ",
        //     "Shree Shaneshwara Krupaposhitha Yakshagana Mandali, Chonamane Ajri","Udupi","Shanishwara, Udupi","Badagutittu",1,"Ancient Heritage",
        //     "Lord Sri Shanishwara Swamy",
        //     "A specialized Badagutittu-style touring temple troupe deeply celebrated for its highly popular and spiritually significant overnight performances of the Shanishwara Mahatme script.",
        //     "ಶನೀಶ್ವರ ಮಹಾತ್ಮೆ ಸ್ಕ್ರಿಪ್ಟ್‌ನ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಮಹತ್ವದ ರಾತ್ರಿ ಪ್ರದರ್ಶನಗಳಿಗೆ ಆಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ವಿಶೇಷ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#B7950B",false,new ArrayList<>(),new ArrayList<>());

        Mela u11 = mela(
    "Hiriyadka Mela",
    "ಹಿರಿಯಡ್ಕ ಮೇಳ",

    "Sri Veerabhadra Swami Dashavatara Yakshagana Mandali, Hiriyadka",

    "Udupi",
    "ಉಡುಪಿ",

    "Hiriyadka, Udupi",
    "ಹಿರಿಯಡ್ಕ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "2008",

    "Lord Sri Veerabhadra Swamy",
    "ಶ್ರೀ ವೀರಭದ್ರ ಸ್ವಾಮಿ",

    "A legendary temple troupe following the traditional Badagutittu style, heavily celebrated for staging classical overnight field dramas filled with powerful percussive music.",

    "ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯನ್ನು ಅನುಸರಿಸುವ ಪ್ರಸಿದ್ಧ ದೇವಸ್ಥಾನ ಮೇಳ, ಬಲಿಷ್ಠ ತಾಳವಾದ್ಯ ಸಂಗೀತದಿಂದ ಕೂಡಿದ ಶಾಸ್ತ್ರೀಯ ರಾತ್ರಿ ನಾಟಕಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.",

    180,

    "#8E44AD",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u12 = mela(
    "Hattiyangadi Mela",
    "ಹಟ್ಟಿಯಂಗಡಿ ಮೇಳ",

    "Sri Siddhivinayaka Krupaposhitha Yakshagana Mandali, Hattiyangadi",

    "Udupi",
    "ಉಡುಪಿ",

    "Hattiyangadi, Udupi",
    "ಹಟ್ಟಿಯಂಗಡಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Siddhivinayaka",
    "ಶ್ರೀ ಸಿದ್ಧಿವಿನಾಯಕ",

    "A highly traditional, single-ensemble Badagutittu-style temple troupe renowned for executing powerful vow-fulfillment (Harake) field dramas across coastal districts.",

    "ಕರಾವಳಿ ಜಿಲ್ಲೆಗಳಾದ್ಯಂತ ಬಲಿಷ್ಠ ಹರಕೆ ಮೈದಾನ ನಾಟಕಗಳನ್ನು ನಡೆಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#9B59B6",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u13 = mela(
    "Kamalashile Mela",
    "ಕಮಲಶಿಲೆ ಮೇಳ",

    "Shri Brahmi Durgaparameshwari Kripaposhita Yakshagana Mandali, Kamalashile",

    "Udupi",
    "ಉಡುಪಿ",

    "Kamalashile, Udupi",
    "ಕಮಲಶಿಲೆ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Shri Brahmi Durgaparameshwari",
    "ಶ್ರೀ ಬ್ರಾಹ್ಮಿ ದುರ್ಗಾಪರಮೇಶ್ವರಿ",

    "A widely celebrated, elite Badagutittu-style temple troupe renowned for executing powerful devotional Harake overnight performances.",

    "ಭಕ್ತಿಪೂರ್ಣ ಹರಕೆ ರಾತ್ರಿ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಗಣ್ಯ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#AF7AC5",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u14 = mela(
    "Kalavadi Mela",
    "ಕಳವಾಡಿ ಮೇಳ",

    "Sri Eshwara Marikamba Prasadita Yakshagana Mandali, Kalavadi (Byndoor)",

    "Udupi",
    "ಉಡುಪಿ",

    "Kalavadi, Udupi",
    "ಕಳವಾಡಿ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Eshwara and Goddess Sri Marikamba",
    "ಶ್ರೀ ಈಶ್ವರ ಮತ್ತು ಶ್ರೀ ಮಾರಿಕಾಂಬೆ",

    "A local festival-centered tradition inviting premier Badagutittu troupes to perform grand overnight mythological plays.",

    "ವಾರ್ಷಿಕ ಜಾತ್ರೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಪ್ರಮುಖ ಬಡಗುತಿಟ್ಟು ಮೇಳಗಳನ್ನು ಆಹ್ವಾನಿಸಿ ಭವ್ಯ ಪುರಾಣ ನಾಟಕಗಳನ್ನು ನಡೆಸುವ ಸ್ಥಳೀಯ ಪರಂಪರೆ.",

    5,

    "#6C3483",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u15 = mela(
    "Sooralu Mela",
    "ಸೂರಾಲು ಮೇಳ",

    "Sri Mahalingeshwara Krupaposhitha Yakshagana Mandali, Sooralu",

    "Udupi",
    "ಉಡುಪಿ",

    "Sooralu, Udupi",
    "ಸೂರಾಲು, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Mahalingeshwara",
    "ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ",

    "A traditional Badagutittu-style touring troupe celebrated for classical performances and legendary mythological plays.",

    "ಶಾಸ್ತ್ರೀಯ ಪ್ರದರ್ಶನಗಳು ಹಾಗೂ ಪುರಾಣ ನಾಟಕಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#7D6608",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela u16 = mela(
    "Shanishwara Mela",
    "ಶನೀಶ್ವರ ಮೇಳ",

    "Shree Shaneshwara Krupaposhitha Yakshagana Mandali, Chonamane Ajri",

    "Udupi",
    "ಉಡುಪಿ",

    "Shanishwara, Udupi",
    "ಶನೀಶ್ವರ, ಉಡುಪಿ",

    "Badagutittu",
    "ಬಡಗುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Shanishwara Swamy",
    "ಶ್ರೀ ಶನೀಶ್ವರ ಸ್ವಾಮಿ",

    "A specialized Badagutittu troupe famous for spiritually significant overnight performances of Shanishwara Mahatme.",

    "ಶನೀಶ್ವರ ಮಹಾತ್ಮೆ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ವಿಶೇಷ ಬಡಗುತಿಟ್ಟು ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#B7950B",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

        // Mela d1 = mela("Bappanadu Mela","ಬಪ್ಪನಾಡು ಮೇಳ",
        //     "Sri Bappanadu Durga Parameshwari Krupaposhita Dashavatara Yakshagana Mandali","Dakshina Kannada","Bappanadu, Dakshina Kannada","Tenkutittu",1,"Ancient Heritage",
        //     "Goddess Sri Durgaparameshwari",
        //     "A highly celebrated Tenkutittu-style (Southern School) temple troupe renowned for its powerful dance steps, vibrant music, and signature performances of the local regional history.",
        //     "ಅದರ ಬಲಿಷ್ಠ ನೃತ್ಯ ಹೆಜ್ಜೆಗಳು, ಚೈತನ್ಯಶೀಲ ಸಂಗೀತ, ಮತ್ತು ಸ್ಥಳೀಯ ಪ್ರಾದೇಶಿಕ ಇತಿಹಾಸದ ವಿಶಿಷ್ಟ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#7E5109",false,new ArrayList<>(),new ArrayList<>());

        // Mela d2 = mela("Pavanje Mela","ಪಾವಂಜೆ ಮೇಳ",
        //     "Shri Jnanashakti Subrahmanyaswami Kripaposhita Yakshagana Mandali, Pavanje","Dakshina Kannada","Pavanje, Dakshina Kannada","Tenkutittu",1,"2020",
        //     "Lord Sri Jnanashakti Subrahmanya Swamy",
        //     "A highly celebrated, modern elite Tenkutittu-style (Southern School) temple troupe that features premium artists and sets commercial records with daily non-stop coastal tours.",
        //     "ಪ್ರಮುಖ ಕಲಾವಿದರನ್ನು ಹೊಂದಿರುವ ಮತ್ತು ದೈನಂದಿನ ನಿರಂತರ ಕರಾವಳಿ ಪ್ರವಾಸಗಳೊಂದಿಗೆ ವಾಣಿಜ್ಯ ದಾಖಲೆಗಳನ್ನು ಸ್ಥಾಪಿಸುವ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಆಧುನಿಕ ಗಣ್ಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     185,"#A04000",false,new ArrayList<>(),new ArrayList<>());

        // Mela d3 = mela("Hanumagiri Mela","ಹನುಮಗಿರಿ ಮೇಳ",
        //     "Sri Kodandarama Krupaphoshitha Yakshagana Mandali, Hanumagiri","Dakshina Kannada","Hanumagiri, Dakshina Kannada","Tenkutittu",1,"2005",
        //     "Lord Sri Kodandarama (and Lord Hanuman)",
        //     "A highly acclaimed professional Tenkutittu-style (Southern School) touring troupe renowned for its artistic excellence, masterful singing, and hosting massive community-funded cultural campaigns.",
        //     "ಅದರ ಕಲಾತ್ಮಕ ಶ್ರೇಷ್ಠತೆ, ಪ್ರವೀಣ ಗಾಯನ, ಮತ್ತು ಬೃಹತ್ ಸಮುದಾಯ-ಧನಸಹಾಯಿತ ಸಾಂಸ್ಕೃತಿಕ ಅಭಿಯಾನಗಳನ್ನು ಆಯೋಜಿಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಪ್ರಶಂಸಿತ ವೃತ್ತಿಪರ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ಸಂಚಾರಿ ಮೇಳ.",
        //     180,"#922B21",false,new ArrayList<>(),new ArrayList<>());

        // Mela d4 = mela("Sasihitlu Mela","ಸಸಿಹಿತ್ಲು ಮೇಳ",
        //     "Sri Bhagavathi Krupaposhitha Yakshagana Mandali, Sasihitlu","Dakshina Kannada","Sasihitlu, Dakshina Kannada","Tenkutittu",1,"2004",
        //     "Goddess Shri Bhagavathi Amma",
        //     "A highly popular, youth-led Tenkutittu-style (Southern School) temple troupe celebrated for its brilliant Tulu language plays, high-energy dancing, and legendary renditions of coastal mythology.",
        //     "ಅದರ ಅದ್ಭುತ ತುಳು ಭಾಷೆಯ ನಾಟಕಗಳು, ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ನೃತ್ಯ, ಮತ್ತು ಕರಾವಳಿ ಪುರಾಣದ ಪ್ರಸಿದ್ಧ ಪ್ರಸ್ತುತಿಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಯುವ-ನೇತೃತ್ವದ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#566573",false,new ArrayList<>(),new ArrayList<>());

        // Mela d5 = mela("Gejjegiri Mela","ಗೆಜ್ಜೆಗಿರಿ ಮೇಳ",
        //     "Sri Adi Dhumavathi, Sri Deyi Baideti Krupaposhitha Yakshagana Mandali, Gejjegiri","Dakshina Kannada","Gejjegiri, Dakshina Kannada","Tenkutittu",1,"2022",
        //     "Sri Adi Dhumavathi and Sri Deyi Baideti",
        //     "A highly celebrated, modern Tenkutittu-style (Southern School) temple troupe immensely famous across the coastal belt for staging the majestic, emotionally-driven local history of Tulunadu.",
        //     "ತುಳುನಾಡಿನ ಭವ್ಯ, ಭಾವನಾತ್ಮಕ ಸ್ಥಳೀಯ ಇತಿಹಾಸವನ್ನು ಪ್ರದರ್ಶಿಸುವುದಕ್ಕೆ ಕರಾವಳಿ ಪಟ್ಟಿಯಾದ್ಯಂತ ಅಪಾರವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಆಧುನಿಕ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#2C3E50",false,new ArrayList<>(),new ArrayList<>());

        // Mela d6 = mela("Sunkadakatte Mela","ಸುಂಕದಕಟ್ಟೆ ಮೇಳ",
        //     "Sri Ambika Annapoorneshwari Krupaposhitha Yakshagana Mandali, Sunkadakatte","Dakshina Kannada","Sunkadakatte, Dakshina Kannada","Tenkutittu",1,"Ancient Heritage",
        //     "Goddess Sri Ambika Annapoorneshwari",
        //     "A historically rich, classical Tenkutittu-style (Southern School) temple troupe heavily celebrated for staging emotion-packed Tulu language plays and legendary mythological epics across coastal villages.",
        //     "ಕರಾವಳಿ ಗ್ರಾಮಗಳಾದ್ಯಂತ ಭಾವನಾಪೂರ್ಣ ತುಳು ಭಾಷೆಯ ನಾಟಕಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಪುರಾಣ ಮಹಾಕಾವ್ಯಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವುದಕ್ಕೆ ಬಹಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ಐತಿಹಾಸಿಕವಾಗಿ ಶ್ರೀಮಂತ, ಶಾಸ್ತ್ರೀಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.",
        //     180,"#34495E",false,new ArrayList<>(),new ArrayList<>());

        // Mela d7 = mela("Shri Benkinatheshwara Mela","ಶ್ರೀ ಬೆಂಕಿನಾಥೇಶ್ವರ ಮೇಳ",
        //     "Shri Benkinatheshwara Krupaposhitha Yakshagana Mandali, Kalavar (Mangalore)","Dakshina Kannada","Dakshina Kannada","Tenkutittu",1,"Ancient Heritage",
        //     "Lord Sri Benkinatheshwara",
        //     "A widely acclaimed Tenkutittu-style (Southern School) touring mela celebrated for its fast-paced dance moves, highly popular Tulu and Kannada comedic acts, and mesmerizing background singing.",
        //     "ಅದರ ವೇಗದ ನೃತ್ಯ ಚಲನೆಗಳು, ಅತ್ಯಂತ ಜನಪ್ರಿಯ ತುಳು ಮತ್ತು ಕನ್ನಡ ಹಾಸ್ಯ ಅಭಿನಯಗಳು, ಮತ್ತು ಮಂತ್ರಮುಗ್ಧಗೊಳಿಸುವ ಹಿನ್ನೆಲೆ ಗಾಯನಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಪ್ರಶಂಸಿತ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ಸಂಚಾರಿ ಮೇಳ.",
        //     180,"#117864",false,new ArrayList<>(),new ArrayList<>());

Mela d1 = mela(
    "Bappanadu Mela",
    "ಬಪ್ಪನಾಡು ಮೇಳ",

    "Sri Bappanadu Durga Parameshwari Krupaposhita Dashavatara Yakshagana Mandali",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Bappanadu, Dakshina Kannada",
    "ಬಪ್ಪನಾಡು, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Sri Durgaparameshwari",
    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ",

    "A highly celebrated Tenkutittu-style temple troupe renowned for powerful dance, vibrant music, and performances of regional history.",

    "ಬಲಿಷ್ಠ ನೃತ್ಯ, ಚೈತನ್ಯಮಯ ಸಂಗೀತ ಮತ್ತು ಸ್ಥಳೀಯ ಇತಿಹಾಸದ ಅದ್ಭುತ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.",

    180,

    "#7E5109",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d2 = mela(
    "Pavanje Mela",
    "ಪಾವಂಜೆ ಮೇಳ",

    "Shri Jnanashakti Subrahmanyaswami Kripaposhita Yakshagana Mandali, Pavanje",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Pavanje, Dakshina Kannada",
    "ಪಾವಂಜೆ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "2020",

    "Lord Sri Jnanashakti Subrahmanya Swamy",
    "ಶ್ರೀ ಜ್ಞಾನಶಕ್ತಿ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿ",

    "A modern elite Tenkutittu troupe featuring premium artists and performing across the coastal belt.",

    "ಪ್ರಮುಖ ಕಲಾವಿದರನ್ನು ಒಳಗೊಂಡ ಆಧುನಿಕ ಗಣ್ಯ ತೆಂಕುತಿಟ್ಟು ಮೇಳ, ಕರಾವಳಿ ಪ್ರದೇಶದಾದ್ಯಂತ ಪ್ರದರ್ಶನ ನೀಡುತ್ತದೆ.",

    185,

    "#A04000",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d3 = mela(
    "Hanumagiri Mela",
    "ಹನುಮಗಿರಿ ಮೇಳ",

    "Sri Kodandarama Krupaphoshitha Yakshagana Mandali, Hanumagiri",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Hanumagiri, Dakshina Kannada",
    "ಹನುಮಗಿರಿ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "2005",

    "Lord Sri Kodandarama (and Lord Hanuman)",
    "ಶ್ರೀ ಕೊಡಂದರಾಮ ಹಾಗೂ ಶ್ರೀ ಹನುಮಂತ",

    "A professional Tenkutittu troupe renowned for artistic excellence, powerful singing and community cultural campaigns.",

    "ಕಲಾತ್ಮಕ ಶ್ರೇಷ್ಠತೆ, ಅದ್ಭುತ ಗಾಯನ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಪ್ರಸಿದ್ಧ ವೃತ್ತಿಪರ ತೆಂಕುತಿಟ್ಟು ಮೇಳ.",

    180,

    "#922B21",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d4 = mela(
    "Sasihitlu Mela",
    "ಸಸಿಹಿತ್ಲು ಮೇಳ",

    "Sri Bhagavathi Krupaposhitha Yakshagana Mandali, Sasihitlu",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Sasihitlu, Dakshina Kannada",
    "ಸಸಿಹಿತ್ಲು, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "2004",

    "Goddess Shri Bhagavathi Amma",
    "ಶ್ರೀ ಭಗವತಿ ಅಮ್ಮ",

    "A youth-led Tenkutittu troupe known for energetic performances and outstanding Tulu plays.",

    "ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಅದ್ಭುತ ತುಳು ನಾಟಕಗಳಿಗೆ ಪ್ರಸಿದ್ಧ ಯುವಕರ ನೇತೃತ್ವದ ತೆಂಕುತಿಟ್ಟು ಮೇಳ.",

    180,

    "#566573",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d5 = mela(
    "Gejjegiri Mela",
    "ಗೆಜ್ಜೆಗಿರಿ ಮೇಳ",

    "Sri Adi Dhumavathi, Sri Deyi Baideti Krupaposhitha Yakshagana Mandali, Gejjegiri",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Gejjegiri, Dakshina Kannada",
    "ಗೆಜ್ಜೆಗಿರಿ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "2022",

    "Sri Adi Dhumavathi and Sri Deyi Baideti",
    "ಶ್ರೀ ಆದಿ ಧೂಮಾವತಿ ಹಾಗೂ ಶ್ರೀ ದೇಯಿ ಬೈದೇತಿ",

    "A modern Tenkutittu troupe famous for presenting the emotional history of Tulunadu.",

    "ತುಳುನಾಡಿನ ಭಾವನಾತ್ಮಕ ಇತಿಹಾಸವನ್ನು ಪ್ರದರ್ಶಿಸುವ ಆಧುನಿಕ ತೆಂಕುತಿಟ್ಟು ಮೇಳ.",

    180,

    "#2C3E50",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d6 = mela(
    "Sunkadakatte Mela",
    "ಸುಂಕದಕಟ್ಟೆ ಮೇಳ",

    "Sri Ambika Annapoorneshwari Krupaposhitha Yakshagana Mandali, Sunkadakatte",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Sunkadakatte, Dakshina Kannada",
    "ಸುಂಕದಕಟ್ಟೆ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Goddess Sri Ambika Annapoorneshwari",
    "ಶ್ರೀ ಅಂಬಿಕಾ ಅನ್ನಪೂರ್ಣೇಶ್ವರಿ",

    "A historic Tenkutittu troupe well known for classical Tulu dramas and mythological performances.",

    "ಶಾಸ್ತ್ರೀಯ ತುಳು ನಾಟಕಗಳು ಹಾಗೂ ಪುರಾಣ ಕಥೆಗಳ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧ ಐತಿಹಾಸಿಕ ತೆಂಕುತಿಟ್ಟು ಮೇಳ.",

    180,

    "#34495E",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);

Mela d7 = mela(
    "Shri Benkinatheshwara Mela",
    "ಶ್ರೀ ಬೆಂಕಿನಾಥೇಶ್ವರ ಮೇಳ",

    "Shri Benkinatheshwara Krupaposhitha Yakshagana Mandali, Kalavar (Mangalore)",

    "Dakshina Kannada",
    "ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Kalavar, Dakshina Kannada",
    "ಕಳವಾರ, ದಕ್ಷಿಣ ಕನ್ನಡ",

    "Tenkutittu",
    "ತೆಂಕುತಿಟ್ಟು",

    1,

    "Ancient Heritage",

    "Lord Sri Benkinatheshwara",
    "ಶ್ರೀ ಬೆಂಕಿನಾಥೇಶ್ವರ",

    "A renowned Tenkutittu touring troupe famous for fast-paced dance, comedy and melodious background singing.",

    "ವೇಗದ ನೃತ್ಯ, ಹಾಸ್ಯ ಹಾಗೂ ಮನಮೋಹಕ ಹಿನ್ನೆಲೆ ಗಾಯನಕ್ಕೆ ಪ್ರಸಿದ್ಧ ತೆಂಕುತಿಟ್ಟು ಸಂಚಾರಿ ಮೇಳ.",

    180,

    "#117864",

    false,

    new ArrayList<>(),
    new ArrayList<>(),

    new ArrayList<>(),
    new ArrayList<>()
);
        List<Mela> ml = mr.saveAll(Arrays.asList(
            m1,m2,m3,m4,m5,m6,
            u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12,u13,u14,u15,u16,
            d1,d2,d3,d4,d5,d6,d7
        ));

        // ── SHOWS ─────────────────────────────────────────────────────────
        LocalDate today = LocalDate.now();
        sr.saveAll(Arrays.asList(
            new Show(null,"Devi Mahatme","Kateel Mela","Troupe 3",
                "Kateel Sri Durgaparameshwari Temple Grounds","Dakshina Kannada",
                today,"20:30","Dawn","Tenkutittu","Devi Bhagavatha",true,true,"Free",13.0039,74.9742,ml.get(0)),
            new Show(null,"Karna Parva","Dharmasthala Mela","Troupe 1",
                "Dharmasthala Open Stage","Dakshina Kannada",
                today,"21:00","00:30","Tenkutittu","Mahabharata",true,false,"Free",12.9541,75.3839,ml.get(1)),
            new Show(null,"Srikrishna Sandhana","Idagunji Mela","Main Troupe",
                "Idagunji Mahaganapati Temple","Uttara Kannada",
                today.plusDays(1),"20:00","Dawn","Badagutittu","Mahabharata",false,true,"Free",14.2095,74.5613,ml.get(4)),
            new Show(null,"Ramayana Sangraha","Saligrama Mela","Main Troupe",
                "Saligrama Veeranarayan Temple","Udupi",
                today.plusDays(3),"19:00","23:00","Badagutittu","Ramayana",false,true,"Free",13.3379,74.7438,ml.get(2)),
            new Show(null,"Subramanya Vijaya","Mandarthi Mela","Troupe 2",
                "Mandarthi Durgaparameshwari Temple","Udupi",
                today.plusDays(4),"20:30","Dawn","Badagutittu","Skanda Purana",false,false,"Free",13.4637,74.8311,ml.get(3)),
            new Show(null,"Draupadi Vasthrapaharana","Dharmasthala Mela","Troupe 2",
                "Ujire Community Hall","Dakshina Kannada",
                today.plusDays(5),"20:00","23:30","Tenkutittu","Mahabharata",false,false,"Rs.50",12.9612,75.3712,ml.get(1))
        ));

        // ── PRASANGAS ─────────────────────────────────────────────────────
        pr.saveAll(Arrays.asList(
            prasanga("Devi Mahatme","ದೇವಿ ಮಹಾತ್ಮೆ","Devi Bhagavatha",
                "The story of the Mother Goddess defeating Mahishasura.",
                "ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ಮಾತೃ ದೇವಿಯ ಕಥೆ.",true),
            prasanga("Karna Parva","ಕರ್ಣ ಪರ್ವ","Mahabharata",
                "The tragic final battle of Karna in the Kurukshetra war.",
                "ಕುರುಕ್ಷೇತ್ರ ಯುದ್ಧದಲ್ಲಿ ಕರ್ಣನ ದುರಂತ ಅಂತಿಮ ಯುದ್ಧ.",true),
            prasanga("Srikrishna Sandhana","ಶ್ರೀಕೃಷ್ಣ ಸಂಧಾನ","Mahabharata",
                "Lord Krishna's peace mission to the Kaurava court.",
                "ಕೌರವ ಸಭೆಗೆ ಶ್ರೀಕೃಷ್ಣನ ಶಾಂತಿ ಕಾರ್ಯಾಚರಣೆ.",true),
            prasanga("Ramayana Sangraha","ರಾಮಾಯಣ ಸಂಗ್ರಹ","Ramayana",
                "Key episodes from Rama's life in Valmiki's Ramayana.",
                "ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣದಲ್ಲಿ ರಾಮನ ಜೀವನದ ಪ್ರಮುಖ ಘಟನೆಗಳು.",false),
            prasanga("Draupadi Vasthrapaharana","ದ್ರೌಪದಿ ವಸ್ತ್ರಾಪಹರಣ","Mahabharata",
                "Draupadi's disrobing and Krishna's miraculous intervention.",
                "ದ್ರೌಪದಿಯ ವಸ್ತ್ರಾಪಹರಣ ಮತ್ತು ಕೃಷ್ಣನ ಅದ್ಭುತ ಮಧ್ಯಸ್ಥಿಕೆ.",false),
            prasanga("Subramanya Vijaya","ಸುಬ್ರಹ್ಮಣ್ಯ ವಿಜಯ","Skanda Purana",
                "Lord Subramanya's battles against the demon Tarakasura.",
                "ತಾರಕಾಸುರ ರಾಕ್ಷಸನ ವಿರುದ್ಧ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿಯ ಯುದ್ಧಗಳು.",false),
            prasanga("Subhadra Kalyana","ಸುಭದ್ರಾ ಕಲ್ಯಾಣ","Mahabharata",
                "Arjuna's secret courtship and marriage to Krishna's sister Subhadra.",
                "ಅರ್ಜುನನ ರಹಸ್ಯ ಪ್ರೇಮ ಮತ್ತು ಕೃಷ್ಣನ ಸಹೋದರಿ ಸುಭದ್ರೆಯೊಂದಿಗಿನ ವಿವಾಹ.",false),
            prasanga("Hidimba Vivaha","ಹಿಡಿಂಬಾ ವಿವಾಹ","Mahabharata",
                "Bhima's marriage to the forest-dwelling Hidimba during the Pandavas' exile.",
                "ಪಾಂಡವರ ವನವಾಸದ ಸಮಯದಲ್ಲಿ ಭೀಮನ ಅರಣ್ಯವಾಸಿ ಹಿಡಿಂಬೆಯೊಂದಿಗಿನ ವಿವಾಹ.",false),
            prasanga("Rukmini Swayamvara","ರುಕ್ಮಿಣಿ ಸ್ವಯಂವರ","Bhagavata",
                "Krishna's elopement with and marriage to princess Rukmini.",
                "ಕೃಷ್ಣನ ರಾಜಕುಮಾರಿ ರುಕ್ಮಿಣಿಯೊಂದಿಗಿನ ಪ್ರೇಮ ಪಲಾಯನ ಮತ್ತು ವಿವಾಹ.",false),
            prasanga("Kamsa Vadhe","ಕಂಸ ವಧೆ","Bhagavata",
                "Young Krishna's killing of the tyrant king Kamsa of Mathura.",
                "ಮಥುರೆಯ ದುಷ್ಟ ರಾಜ ಕಂಸನ ಬಾಲಕೃಷ್ಣನಿಂದ ವಧೆ.",false),
            prasanga("Vali Vadhe","ವಾಲಿ ವಧೆ","Ramayana",
                "Rama's killing of the vanara king Vali to help Sugriva reclaim his throne.",
                "ಸುಗ್ರೀವನು ತನ್ನ ಸಿಂಹಾಸನವನ್ನು ಮರಳಿ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಲು ರಾಮನು ವಾನರ ರಾಜ ವಾಲಿಯನ್ನು ಕೊಂದದ್ದು.",false),
            prasanga("Sougandhika Parinaya","ಸೌಗಂಧಿಕಾ ಪರಿಣಯ","Mahabharata",
                "Bhima's adventurous quest for the fragrant Saugandhika flower to please Draupadi.",
                "ದ್ರೌಪದಿಯನ್ನು ಸಂತೋಷಪಡಿಸಲು ಸುಗಂಧಭರಿತ ಸೌಗಂಧಿಕ ಹೂವಿಗಾಗಿ ಭೀಮನ ಸಾಹಸಮಯ ಅನ್ವೇಷಣೆ.",false),
            prasanga("Rathnavathi Kalyana","ರತ್ನಾವತಿ ಕಲ್ಯಾಣ","Purana",
                "A celebrated puranic tale of princess Rathnavathi's marriage, composed by the poet Muddana.",
                "ಕವಿ ಮುದ್ದಣ್ಣನವರಿಂದ ರಚಿತವಾದ ರಾಜಕುಮಾರಿ ರತ್ನಾವತಿಯ ವಿವಾಹದ ಪ್ರಸಿದ್ಧ ಪುರಾಣ ಕಥೆ.",false),
            prasanga("Chandravali","ಚಂದ್ರಾವಳಿ","Bhagavata",
                "A poignant tale of love and longing centred on the character Chandravali.",
                "ಚಂದ್ರಾವಳಿ ಪಾತ್ರದ ಸುತ್ತ ಕೇಂದ್ರೀಕೃತವಾದ ಪ್ರೇಮ ಮತ್ತು ವಿರಹದ ಹೃದಯಸ್ಪರ್ಶಿ ಕಥೆ.",false),
            prasanga("Bali Chakravarthi","ಬಲಿ ಚಕ್ರವರ್ತಿ","Dashavatara",
                "Lord Vishnu's dwarf Vamana avatar humbling the generous king Bali to reclaim the three worlds.",
                "ಮೂರು ಲೋಕಗಳನ್ನು ಮರಳಿ ಪಡೆಯಲು ವಿಷ್ಣುವಿನ ವಾಮನ ಅವತಾರವು ಉದಾರ ರಾಜ ಬಲಿಯನ್ನು ವಿನಮ್ರಗೊಳಿಸಿದ ಕಥೆ.",false)
        ));

        System.out.println("✅ Yakshagana Portal — all " + mr.count() + " melas seeded to MySQL (with Kannada descriptions)!");
    }

    // private Mela mela(String name, String kannadaName, String fullName,
    //                   String region, String location, String style,
    //                   int troupeCount, String foundedYear, String deity,
    //                   String description, String descriptionKn, int showsThisSeason, String colorHex,
    //                   boolean isFamous, List<String> artists, List<String> prasangas) {
    //     Mela m = new Mela();
    //     m.setName(name); m.setKannadaName(kannadaName); m.setFullName(fullName);
    //     m.setRegion(region); m.setLocation(location); m.setStyle(style);
    //     m.setTroupeCount(troupeCount); m.setFoundedYear(foundedYear); m.setDeity(deity);
    //     m.setDescription(description); m.setDescriptionKn(descriptionKn); m.setShowsThisSeason(showsThisSeason);
    //     m.setColorHex(colorHex); m.setFamous(isFamous);
    //     m.setFamousArtists(artists); m.setPopularPrasangas(prasangas);
    //     return m;
    // }

    private Mela mela(
        String name,
        String kannadaName,
        String fullName,

        String region,
        String regionKn,

        String location,
        String locationKn,

        String style,
        String styleKn,

        int troupeCount,

        String foundedYear,

        String deity,
        String deityKn,

        String description,
        String descriptionKn,

        int showsThisSeason,

        String colorHex,

        boolean isFamous,

        List<String> artists,
        List<String> artistsKn,

        List<String> prasangas,
        List<String> prasangasKn) {

    Mela m = new Mela();

    m.setName(name);
    m.setKannadaName(kannadaName);
    m.setFullName(fullName);

    m.setRegion(region);
    m.setRegionKn(regionKn);

    m.setLocation(location);
    m.setLocationKn(locationKn);

    m.setStyle(style);
    m.setStyleKn(styleKn);

    m.setTroupeCount(troupeCount);

    m.setFoundedYear(foundedYear);

    m.setDeity(deity);
    m.setDeityKn(deityKn);

    m.setDescription(description);
    m.setDescriptionKn(descriptionKn);

    m.setShowsThisSeason(showsThisSeason);

    m.setColorHex(colorHex);

    m.setFamous(isFamous);

    m.setFamousArtists(artists);
    m.setFamousArtistsKn(artistsKn);

    m.setPopularPrasangas(prasangas);
    m.setPopularPrasangasKn(prasangasKn);

    return m;
}

    private Prasanga prasanga(String name, String nameKn, String epic, String description, String descriptionKn, boolean isFamous) {
        Prasanga p = new Prasanga();
        p.setName(name); p.setNameKn(nameKn); p.setEpic(epic);
        p.setDescription(description); p.setDescriptionKn(descriptionKn); p.setFamous(isFamous);
        return p;
    }

    private void updateTonightDatesToToday() {
        LocalDate today = LocalDate.now();
        List<Show> tonightShows = sr.findByIsTonight(true);
        for (Show show : tonightShows) { show.setDate(today); sr.save(show); }
        if (!tonightShows.isEmpty())
            System.out.println("✅ Updated " + tonightShows.size() + " tonight show dates to " + today);
    }
}
