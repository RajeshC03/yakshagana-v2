-- ============================================================
-- BILINGUAL CONTENT MIGRATION — adds Kannada descriptions
-- Run this on your EXISTING database (no data loss, no TRUNCATE needed)
-- ============================================================

-- STEP 1 — Add the new columns
ALTER TABLE melas ADD COLUMN description_kn VARCHAR(1500);
ALTER TABLE prasangas ADD COLUMN description_kn VARCHAR(1000);

-- STEP 2 — Disable safe update mode (needed for UPDATE ... WHERE name = '...')
SET SQL_SAFE_UPDATES = 0;

-- ============================================================
-- MELAS — 29 entries
-- ============================================================

UPDATE melas SET description_kn = 'ಏಳು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಯಕ್ಷಗಾನ ಸಂಸ್ಥೆ, ಇದು ಕರ್ನಾಟಕದ ಅತಿ ದೊಡ್ಡ ಮೇಳವಾಗಿದೆ.' WHERE name = 'Kateel Mela';
UPDATE melas SET description_kn = 'ಧರ್ಮಸ್ಥಳ ದೇವಸ್ಥಾನದಿಂದ ಪ್ರಾಯೋಜಿತವಾದ ಅತ್ಯಂತ ಹಳೆಯ ಮತ್ತು ಪ್ರತಿಷ್ಠಿತ ಮೇಳಗಳಲ್ಲಿ ಒಂದು.' WHERE name = 'Dharmasthala Mela';
UPDATE melas SET description_kn = 'ಆಧುನಿಕ ಟೆಂಟ್ ಪ್ರದರ್ಶನ ಮಾದರಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿದ ಖ್ಯಾತಿಯ ಪ್ರಸಿದ್ಧ ಮೇಳ.' WHERE name = 'Saligrama Mela';
UPDATE melas SET description_kn = 'ಐದು ಸಂಚಾರಿ ತಂಡಗಳನ್ನು ಹೊಂದಿರುವ ಅತಿ ದೊಡ್ಡ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಒಂದು.' WHERE name = 'Mandarthi Mela';
UPDATE melas SET description_kn = 'ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಪ್ರಮುಖ ಮೇಳ. ಕೆರೆಮನೆ ಶಿವರಾಮ ಹೆಗ್ಡೆಯವರಿಂದ ಸ್ಥಾಪಿತ.' WHERE name = 'Idagunji Mela';
UPDATE melas SET description_kn = 'ಕುಂದಾಪುರ ಪ್ರಾಂತ್ಯದ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಮೇಳ.' WHERE name = 'Perduru Mela';

UPDATE melas SET description_kn = 'ಕರ್ನಾಟಕದ ಕರಾವಳಿ ಪ್ರದೇಶದಲ್ಲಿರುವ ಪ್ರಸಿದ್ಧ, ದೈವಿಕ ಪಂಚಪದ ಯಕ್ಷಗಾನ ಮೇಳ, ಇದು ಉಡುಪಿ ಜಿಲ್ಲೆಯ ಸಾಸ್ತಾನದಲ್ಲಿರುವ ಪವಿತ್ರ ಶ್ರೀ ಕ್ಷೇತ್ರ ಗೋಳಿಗರಡಿಯೊಂದಿಗೆ ನಿರ್ದಿಷ್ಟವಾಗಿ ಸಂಬಂಧ ಹೊಂದಿದೆ.' WHERE name = 'Goligaradi Mela';
UPDATE melas SET description_kn = 'ಬಡಗು ತಿಟ್ಟು (ಉತ್ತರ) ಶೈಲಿಯಡಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಅತ್ಯಂತ ಪೂಜ್ಯ, ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ ಆಧಾರಿತ ಯಕ್ಷಗಾನ ನೃತ್ಯ-ನಾಟಕ ಮೇಳ.' WHERE name = 'Maranakatte Mela';
UPDATE melas SET description_kn = 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಚೌಡೇಶ್ವರಿ ದೇವಿಯ ಪವಿತ್ರ ಇತಿಹಾಸ ಮತ್ತು ಪುರಾಣ ಕಥೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಸಮರ್ಪಿತವಾದ ಪ್ರಮುಖ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Siganduru Mela';
UPDATE melas SET description_kn = 'ಈ ಜಾತ್ರೆಯು ಆಹ್ವಾನಿತ, ಉನ್ನತ ಮಟ್ಟದ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳಗಳನ್ನು ತನ್ನ ಪ್ರಮುಖ ಜಾತ್ರಾ ದಿನಗಳಲ್ಲಿ ಸಾರ್ವಜನಿಕರಿಗಾಗಿ ಶಾಸ್ತ್ರೀಯ, ರಾತ್ರಿಯಿಡೀ ಪುರಾಣ ನೃತ್ಯ-ನಾಟಕಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಆಹ್ವಾನಿಸುತ್ತದೆ.' WHERE name = 'Somavara Santhe Mela/Shri Gutyamma Mela';
UPDATE melas SET description_kn = 'ಕರಾವಳಿ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಹೆಚ್ಚು ಬೇಡಿಕೆಯಿರುವ ರಾತ್ರಿಯಿಡೀ ವಾಣಿಜ್ಯ ಟೆಂಟ್ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹರಕೆ ಪ್ರದರ್ಶನಗಳನ್ನು ನಡೆಸುವ ಹೊಸದಾಗಿ ಉನ್ನತೀಕರಿಸಿದ, ಗಣ್ಯ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Mekkekatte Mela';
UPDATE melas SET description_kn = 'ತನ್ನ ಸ್ಥಳೀಯ ಕುಂದಾಪುರ ಕನ್ನಡ ಸಂಭಾಷಣೆಗಳು ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ಪುರಾಣ ನಾಟಕಗಳ ಅದ್ಭುತ ಸಂಗೀತ ಪ್ರಸ್ತುತಿಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Haladi Mela';
UPDATE melas SET description_kn = 'ಅದರ ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ಪ್ರದರ್ಶನಗಳು, ಪ್ರವೀಣ ಹಾಸ್ಯ ಅಭಿನಯ ಮತ್ತು ಜನಪ್ರಿಯ ಆಧುನಿಕ ಯಶಸ್ಸುಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Madamakki Mela';
UPDATE melas SET description_kn = 'ಅಧಿಕೃತ, ಶಾಸ್ತ್ರೀಯ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಬಲಿಷ್ಠ ಹರಕೆ ಪ್ರದರ್ಶನಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ವ್ಯಾಪಕವಾಗಿ ಗೌರವಿಸಲ್ಪಡುವ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Kota Amrutheshwari Mela';
UPDATE melas SET description_kn = 'ಅಧಿಕೃತ ಕರಾವಳಿ ಪುರಾಣ ಮತ್ತು ಹೆಚ್ಚು ಬೇಡಿಕೆಯಿರುವ ಹರಕೆ ರಾತ್ರಿ ನಾಟಕಗಳನ್ನು ಪ್ರಸ್ತುತಪಡಿಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಪ್ರತಿಷ್ಠಿತ, ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Neelavara Mela';
UPDATE melas SET description_kn = 'ಪ್ರಸಿದ್ಧ ಕಿಶನ್ ಹೆಗ್ಡೆ ಬ್ಯಾನರ್ ಅಡಿಯಲ್ಲಿ ನಿರ್ವಹಿಸಲ್ಪಡುವ, ಅದರ ಶ್ರೀಮಂತ ಶಾಸ್ತ್ರೀಯ ಪ್ರಸ್ತುತಿ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಋತುಮಾನ ಪ್ರವಾಸಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Soukooru Mela';
UPDATE melas SET description_kn = 'ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯನ್ನು ಅನುಸರಿಸುವ ಪ್ರಸಿದ್ಧ ದೇವಸ್ಥಾನ ಮೇಳ, ಬಲಿಷ್ಠ ತಾಳವಾದ್ಯ ಸಂಗೀತದಿಂದ ತುಂಬಿದ ಶಾಸ್ತ್ರೀಯ ರಾತ್ರಿ ಮೈದಾನ ನಾಟಕಗಳಿಗೆ ಬಹಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.' WHERE name = 'Hiriyadka Mela';
UPDATE melas SET description_kn = 'ಕರಾವಳಿ ಜಿಲ್ಲೆಗಳಾದ್ಯಂತ ಬಲಿಷ್ಠ ಹರಕೆ ಮೈದಾನ ನಾಟಕಗಳನ್ನು ನಡೆಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಸಾಂಪ್ರದಾಯಿಕ, ಏಕೈಕ ತಂಡದ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Hattiyangadi Mela';
UPDATE melas SET description_kn = 'ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಪ್ರದೇಶಗಳಾದ್ಯಂತ ಬಲಿಷ್ಠ, ಭಕ್ತಿಪೂರ್ಣ ಹರಕೆ ರಾತ್ರಿ ನಾಟಕಗಳನ್ನು ನಡೆಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಪ್ರಸಿದ್ಧ, ಗಣ್ಯ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Kamalashile Mela';
UPDATE melas SET description_kn = 'ದೇವಸ್ಥಾನದ ವಾರ್ಷಿಕ ಜಾತ್ರೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಭವ್ಯ ರಾತ್ರಿ ಪುರಾಣ ನಾಟಕಗಳನ್ನು ನಡೆಸಲು ಆಹ್ವಾನಿತ, ಪ್ರಮುಖ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ಮೇಳಗಳನ್ನು ಆಹ್ವಾನಿಸುವ ಸ್ಥಳೀಯ ಜಾತ್ರಾ-ಕೇಂದ್ರಿತ ಪ್ರದರ್ಶನ ಪರಂಪರೆ.' WHERE name = 'Kalavadi Mela';
UPDATE melas SET description_kn = 'ಅದರ ಶಾಸ್ತ್ರೀಯ ಪ್ರದರ್ಶನ ರಚನೆ, ಚಂಡೆ ವಾದ್ಯದ ಹೆಚ್ಚಿನ ಬಳಕೆ, ಮತ್ತು ಶ್ರೀಮಂತ, ಪ್ರಸಿದ್ಧ ಪುರಾಣ ನಾಟಕಗಳ ಅಭಿನಯಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Sooralu Mela';
UPDATE melas SET description_kn = 'ಶನೀಶ್ವರ ಮಹಾತ್ಮೆ ಸ್ಕ್ರಿಪ್ಟ್‌ನ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಮಹತ್ವದ ರಾತ್ರಿ ಪ್ರದರ್ಶನಗಳಿಗೆ ಆಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ವಿಶೇಷ ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಸಂಚಾರಿ ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Shanishwara Mela';

UPDATE melas SET description_kn = 'ಅದರ ಬಲಿಷ್ಠ ನೃತ್ಯ ಹೆಜ್ಜೆಗಳು, ಚೈತನ್ಯಶೀಲ ಸಂಗೀತ, ಮತ್ತು ಸ್ಥಳೀಯ ಪ್ರಾದೇಶಿಕ ಇತಿಹಾಸದ ವಿಶಿಷ್ಟ ಪ್ರದರ್ಶನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Bappanadu Mela';
UPDATE melas SET description_kn = 'ಪ್ರಮುಖ ಕಲಾವಿದರನ್ನು ಹೊಂದಿರುವ ಮತ್ತು ದೈನಂದಿನ ನಿರಂತರ ಕರಾವಳಿ ಪ್ರವಾಸಗಳೊಂದಿಗೆ ವಾಣಿಜ್ಯ ದಾಖಲೆಗಳನ್ನು ಸ್ಥಾಪಿಸುವ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಆಧುನಿಕ ಗಣ್ಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Pavanje Mela';
UPDATE melas SET description_kn = 'ಅದರ ಕಲಾತ್ಮಕ ಶ್ರೇಷ್ಠತೆ, ಪ್ರವೀಣ ಗಾಯನ, ಮತ್ತು ಬೃಹತ್ ಸಮುದಾಯ-ಧನಸಹಾಯಿತ ಸಾಂಸ್ಕೃತಿಕ ಅಭಿಯಾನಗಳನ್ನು ಆಯೋಜಿಸುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಪ್ರಶಂಸಿತ ವೃತ್ತಿಪರ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Hanumagiri Mela';
UPDATE melas SET description_kn = 'ಅದರ ಅದ್ಭುತ ತುಳು ಭಾಷೆಯ ನಾಟಕಗಳು, ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ನೃತ್ಯ, ಮತ್ತು ಕರಾವಳಿ ಪುರಾಣದ ಪ್ರಸಿದ್ಧ ಪ್ರಸ್ತುತಿಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಯುವ-ನೇತೃತ್ವದ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Sasihitlu Mela';
UPDATE melas SET description_kn = 'ತುಳುನಾಡಿನ ಭವ್ಯ, ಭಾವನಾತ್ಮಕ ಸ್ಥಳೀಯ ಇತಿಹಾಸವನ್ನು ಪ್ರದರ್ಶಿಸುವುದಕ್ಕೆ ಕರಾವಳಿ ಪಟ್ಟಿಯಾದ್ಯಂತ ಅಪಾರವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ಅತ್ಯಂತ ಜನಪ್ರಿಯ, ಆಧುನಿಕ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Gejjegiri Mela';
UPDATE melas SET description_kn = 'ಕರಾವಳಿ ಗ್ರಾಮಗಳಾದ್ಯಂತ ಭಾವನಾಪೂರ್ಣ ತುಳು ಭಾಷೆಯ ನಾಟಕಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಪುರಾಣ ಮಹಾಕಾವ್ಯಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವುದಕ್ಕೆ ಬಹಳವಾಗಿ ಪ್ರಸಿದ್ಧವಾದ ಐತಿಹಾಸಿಕವಾಗಿ ಶ್ರೀಮಂತ, ಶಾಸ್ತ್ರೀಯ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ದೇವಸ್ಥಾನ ಮೇಳ.' WHERE name = 'Sunkadakatte Mela';
UPDATE melas SET description_kn = 'ಅದರ ವೇಗದ ನೃತ್ಯ ಚಲನೆಗಳು, ಅತ್ಯಂತ ಜನಪ್ರಿಯ ತುಳು ಮತ್ತು ಕನ್ನಡ ಹಾಸ್ಯ ಅಭಿನಯಗಳು, ಮತ್ತು ಮಂತ್ರಮುಗ್ಧಗೊಳಿಸುವ ಹಿನ್ನೆಲೆ ಗಾಯನಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾದ ವ್ಯಾಪಕವಾಗಿ ಪ್ರಶಂಸಿತ ತೆಂಕುತಿಟ್ಟು ಶೈಲಿಯ (ದಕ್ಷಿಣ ಶಾಲೆ) ಸಂಚಾರಿ ಮೇಳ.' WHERE name = 'Shri Benkinatheshwara Mela';

-- ============================================================
-- PRASANGAS — 15 entries
-- ============================================================

UPDATE prasangas SET description_kn = 'ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ಮಾತೃ ದೇವಿಯ ಕಥೆ.' WHERE name = 'Devi Mahatme';
UPDATE prasangas SET description_kn = 'ಕುರುಕ್ಷೇತ್ರ ಯುದ್ಧದಲ್ಲಿ ಕರ್ಣನ ದುರಂತ ಅಂತಿಮ ಯುದ್ಧ.' WHERE name = 'Karna Parva';
UPDATE prasangas SET description_kn = 'ಕೌರವ ಸಭೆಗೆ ಶ್ರೀಕೃಷ್ಣನ ಶಾಂತಿ ಕಾರ್ಯಾಚರಣೆ.' WHERE name = 'Srikrishna Sandhana';
UPDATE prasangas SET description_kn = 'ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣದಲ್ಲಿ ರಾಮನ ಜೀವನದ ಪ್ರಮುಖ ಘಟನೆಗಳು.' WHERE name = 'Ramayana Sangraha';
UPDATE prasangas SET description_kn = 'ದ್ರೌಪದಿಯ ವಸ್ತ್ರಾಪಹರಣ ಮತ್ತು ಕೃಷ್ಣನ ಅದ್ಭುತ ಮಧ್ಯಸ್ಥಿಕೆ.' WHERE name = 'Draupadi Vasthrapaharana';
UPDATE prasangas SET description_kn = 'ತಾರಕಾಸುರ ರಾಕ್ಷಸನ ವಿರುದ್ಧ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿಯ ಯುದ್ಧಗಳು.' WHERE name = 'Subramanya Vijaya';
UPDATE prasangas SET description_kn = 'ಅರ್ಜುನನ ರಹಸ್ಯ ಪ್ರೇಮ ಮತ್ತು ಕೃಷ್ಣನ ಸಹೋದರಿ ಸುಭದ್ರೆಯೊಂದಿಗಿನ ವಿವಾಹ.' WHERE name = 'Subhadra Kalyana';
UPDATE prasangas SET description_kn = 'ಪಾಂಡವರ ವನವಾಸದ ಸಮಯದಲ್ಲಿ ಭೀಮನ ಅರಣ್ಯವಾಸಿ ಹಿಡಿಂಬೆಯೊಂದಿಗಿನ ವಿವಾಹ.' WHERE name = 'Hidimba Vivaha';
UPDATE prasangas SET description_kn = 'ಕೃಷ್ಣನ ರಾಜಕುಮಾರಿ ರುಕ್ಮಿಣಿಯೊಂದಿಗಿನ ಪ್ರೇಮ ಪಲಾಯನ ಮತ್ತು ವಿವಾಹ.' WHERE name = 'Rukmini Swayamvara';
UPDATE prasangas SET description_kn = 'ಮಥುರೆಯ ದುಷ್ಟ ರಾಜ ಕಂಸನ ಬಾಲಕೃಷ್ಣನಿಂದ ವಧೆ.' WHERE name = 'Kamsa Vadhe';
UPDATE prasangas SET description_kn = 'ಸುಗ್ರೀವನು ತನ್ನ ಸಿಂಹಾಸನವನ್ನು ಮರಳಿ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಲು ರಾಮನು ವಾನರ ರಾಜ ವಾಲಿಯನ್ನು ಕೊಂದದ್ದು.' WHERE name = 'Vali Vadhe';
UPDATE prasangas SET description_kn = 'ದ್ರೌಪದಿಯನ್ನು ಸಂತೋಷಪಡಿಸಲು ಸುಗಂಧಭರಿತ ಸೌಗಂಧಿಕ ಹೂವಿಗಾಗಿ ಭೀಮನ ಸಾಹಸಮಯ ಅನ್ವೇಷಣೆ.' WHERE name = 'Sougandhika Parinaya';
UPDATE prasangas SET description_kn = 'ಕವಿ ಮುದ್ದಣ್ಣನವರಿಂದ ರಚಿತವಾದ ರಾಜಕುಮಾರಿ ರತ್ನಾವತಿಯ ವಿವಾಹದ ಪ್ರಸಿದ್ಧ ಪುರಾಣ ಕಥೆ.' WHERE name = 'Rathnavathi Kalyana';
UPDATE prasangas SET description_kn = 'ಚಂದ್ರಾವಳಿ ಪಾತ್ರದ ಸುತ್ತ ಕೇಂದ್ರೀಕೃತವಾದ ಪ್ರೇಮ ಮತ್ತು ವಿರಹದ ಹೃದಯಸ್ಪರ್ಶಿ ಕಥೆ.' WHERE name = 'Chandravali';
UPDATE prasangas SET description_kn = 'ಮೂರು ಲೋಕಗಳನ್ನು ಮರಳಿ ಪಡೆಯಲು ವಿಷ್ಣುವಿನ ವಾಮನ ಅವತಾರವು ಉದಾರ ರಾಜ ಬಲಿಯನ್ನು ವಿನಮ್ರಗೊಳಿಸಿದ ಕಥೆ.' WHERE name = 'Bali Chakravarthi';

-- STEP 3 — Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- STEP 4 — Verify
SELECT name, description_kn FROM melas LIMIT 5;
SELECT name, description_kn FROM prasangas LIMIT 5;

-- ============================================================
-- ADD name_kn to prasangas (run this if column doesn't exist)
-- ============================================================
ALTER TABLE prasangas ADD COLUMN IF NOT EXISTS name_kn VARCHAR(255);

SET SQL_SAFE_UPDATES = 0;

UPDATE prasangas SET name_kn = 'ದೇವಿ ಮಹಾತ್ಮೆ' WHERE name = 'Devi Mahatme';
UPDATE prasangas SET name_kn = 'ಕರ್ಣ ಪರ್ವ' WHERE name = 'Karna Parva';
UPDATE prasangas SET name_kn = 'ಶ್ರೀಕೃಷ್ಣ ಸಂಧಾನ' WHERE name = 'Srikrishna Sandhana';
UPDATE prasangas SET name_kn = 'ರಾಮಾಯಣ ಸಂಗ್ರಹ' WHERE name = 'Ramayana Sangraha';
UPDATE prasangas SET name_kn = 'ದ್ರೌಪದಿ ವಸ್ತ್ರಾಪಹರಣ' WHERE name = 'Draupadi Vasthrapaharana';
UPDATE prasangas SET name_kn = 'ಸುಬ್ರಹ್ಮಣ್ಯ ವಿಜಯ' WHERE name = 'Subramanya Vijaya';
UPDATE prasangas SET name_kn = 'ಸುಭದ್ರಾ ಕಲ್ಯಾಣ' WHERE name = 'Subhadra Kalyana';
UPDATE prasangas SET name_kn = 'ಹಿಡಿಂಬಾ ವಿವಾಹ' WHERE name = 'Hidimba Vivaha';
UPDATE prasangas SET name_kn = 'ರುಕ್ಮಿಣಿ ಸ್ವಯಂವರ' WHERE name = 'Rukmini Swayamvara';
UPDATE prasangas SET name_kn = 'ಕಂಸ ವಧೆ' WHERE name = 'Kamsa Vadhe';
UPDATE prasangas SET name_kn = 'ವಾಲಿ ವಧೆ' WHERE name = 'Vali Vadhe';
UPDATE prasangas SET name_kn = 'ಸೌಗಂಧಿಕಾ ಪರಿಣಯ' WHERE name = 'Sougandhika Parinaya';
UPDATE prasangas SET name_kn = 'ರತ್ನಾವತಿ ಕಲ್ಯಾಣ' WHERE name = 'Rathnavathi Kalyana';
UPDATE prasangas SET name_kn = 'ಚಂದ್ರಾವಳಿ' WHERE name = 'Chandravali';
UPDATE prasangas SET name_kn = 'ಬಲಿ ಚಕ್ರವರ್ತಿ' WHERE name = 'Bali Chakravarthi';

SET SQL_SAFE_UPDATES = 1;
