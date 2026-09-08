/** Bibliography supplied by the laboratory. Repeated references to the same
 * publication in the source material are listed once. Publication titles are
 * retained in their original language in both site language modes. */
export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  url: string | null;
  forthcoming: boolean;
}

export const publications: Publication[] = [
  {
    "id": "publication-01",
    "year": 2026,
    "title": "Motion Style Slider: Endpoint-Supervised Continuous Style Control for Human Motion Diffusion",
    "authors": "Chen-Chieh Liao, Yichen Peng, Yiyi Cai, Yûi Ono, Hiroki Hanaoka, Erwin Wu, Hideki Koike, and Shuichi Kurabayashi",
    "venue": "European Conference on Computer Vision (ECCV)",
    "url": null,
    "forthcoming": true
  },
  {
    "id": "publication-02",
    "year": 2026,
    "title": "Rayauth: Camera-Only Mobile Authentication of Cards via Guided Capture of Spatiotemporal Diffractive Optical Signatures",
    "authors": "Shuichi Kurabayashi and Hiroki Hanaoka",
    "venue": "Companion Proceedings of the Symposium on Interactive 3D Graphics and Games (I3D Companion '26), May 13–15, 2026, San Francisco, CA, USA, ACM, 3 pages",
    "url": "https://doi.org/10.1145/3807895.3807933",
    "forthcoming": false
  },
  {
    "id": "publication-03",
    "year": 2025,
    "title": "ShiftingGolf: Gross Motor Skill Correction using Redirection in VR",
    "authors": "Chen-Chieh Liao, Zhihao Yu, and Hideki Koike",
    "venue": "IEEE Transactions on Visualization and Computer Graphics, 2025, 1–11",
    "url": "https://doi.org/10.1109/TVCG.2025.3549170",
    "forthcoming": false
  },
  {
    "id": "publication-04",
    "year": 2024,
    "title": "Controlled Chain of Thought: Eliciting Role-Play Understanding in LLM Through Prompts",
    "authors": "Deborah Carlander, Kiyoshiro Okada, Henrik Engström, and Shuichi Kurabayashi",
    "venue": "2024 IEEE Conference on Games (CoG), Milan, Italy, 2024, 4 pages",
    "url": "https://doi.org/10.1109/CoG60054.2024.10645667",
    "forthcoming": false
  },
  {
    "id": "publication-05",
    "year": 2024,
    "title": "Cross-regional analysis of RRM design and implementation in mobile games by developers in China, the EU, Japan, and the USA",
    "authors": "Yukiko Sato, Stefan Brückner, Jin Michael Splichal, Ikumi Waragai, Shuichi Kurabayashi",
    "venue": "Entertainment Computing, Volume 48, 2024, 100606, Elsevier, ISSN: 1875-9521, 16 pages",
    "url": "https://doi.org/10.1016/j.entcom.2023.100606",
    "forthcoming": false
  },
  {
    "id": "publication-06",
    "year": 2023,
    "title": "End-to-End仮想化と生成AIの統合がもたらすゲーム開発の未来",
    "authors": "倉林 修一",
    "venue": "人工知能, Vol.38, Num.5, 人工知能学会, 637-644, 2023",
    "url": "https://doi.org/10.11517/jjsai.38.5_637",
    "forthcoming": false
  },
  {
    "id": "publication-07",
    "year": 2023,
    "title": "Research-as-a-Service: 開放型の研究者育成制度による継続的イノベーションの実現",
    "authors": "倉林 修一",
    "venue": "経営システム, 第33巻, 第1号, 日本経営工学会, 43-50, 2023",
    "url": "https://cir.nii.ac.jp/crid/1520578603923651328",
    "forthcoming": false
  },
  {
    "id": "publication-08",
    "year": 2023,
    "title": "Learned Pseudo-Random Number Generator: WGAN-GP for Generating Statistically Robust Random Numbers",
    "authors": "Kiyoshiro Okada, Katsuhiro Endo, Kenji Yasuoka, Shuichi Kurabayashi",
    "venue": "PLOS ONE 18(6): e0287025, 19 pages, 2023",
    "url": "https://doi.org/10.1371/journal.pone.0287025",
    "forthcoming": false
  },
  {
    "id": "publication-09",
    "year": 2022,
    "title": "Dynamic Motion Matching: Design and Implementation of a Context-Aware Animation System for Games",
    "authors": "Adan Häfliger and Shuichi Kurabayashi",
    "venue": "International Journal of Semantic Computing, World Scientific, Volume 16, Issue 2, 2022, pp. 189-212, ISSN: 1793-351X",
    "url": "https://doi.org/10.1142/S1793351X22400086",
    "forthcoming": false
  },
  {
    "id": "publication-10",
    "year": 2021,
    "title": "Dynamic motion matching: Context-aware character animation with subspaces ensembling",
    "authors": "Adan Häfliger and Shuichi Kurabayashi",
    "venue": "in Proceedings of the 23rd IEEE International Symposium on Multimedia (ISM 2021), Online: IEEE, Nov. 2021, pp. 115–122",
    "url": "https://doi.org/10.1109/ISM52913.2021.00028",
    "forthcoming": false
  },
  {
    "id": "publication-11",
    "year": 2021,
    "title": "Cross-cultural game studies",
    "authors": "Yukiko Sato",
    "venue": "in Encyclopedia of Computer Graphics and Games, Newton Lee, Ed. Cham: Springer International Publishing, 2021, pp. 1–6, isbn: 978-3-319-08234-9",
    "url": "https://doi.org/10.1007/978-3-319-08234-9_400-1",
    "forthcoming": false
  },
  {
    "id": "publication-12",
    "year": 2021,
    "title": "PBL-based industry-academia game development education",
    "authors": "Yukiko Sato",
    "venue": "in Encyclopedia of Computer Graphics and Games, Newton Lee, Ed. Cham: Springer International Publishing, 2021, pp. 1–9, isbn: 978-3-319-08234-9",
    "url": "https://doi.org/10.1007/978-3-319-08234-9_399-1",
    "forthcoming": false
  },
  {
    "id": "publication-13",
    "year": 2021,
    "title": "High-performance many-light rendering",
    "authors": "Tong Wang",
    "venue": "in Encyclopedia of Computer Graphics and Games, Newton Lee, Ed. Cham: Springer International Publishing, 2021, pp. 1–6, isbn: 978-3-319-08234-9",
    "url": "https://doi.org/10.1007/978-3-319-08234-9_397-1",
    "forthcoming": false
  },
  {
    "id": "publication-14",
    "year": 2021,
    "title": "Poisson-disk sampling: Theory and applications",
    "authors": "Tong Wang",
    "venue": "in Encyclopedia of Computer Graphics and Games, Newton Lee, Ed. Cham: Springer International Publishing, 2021, pp. 1–8, isbn: 978-3-319-08234-9",
    "url": "https://doi.org/10.1007/978-3-319-08234-9_398-1",
    "forthcoming": false
  },
  {
    "id": "publication-15",
    "year": 2020,
    "title": "Investigating the elusive role of level design",
    "authors": "Tobias Karlsson, Yukiko Sato, and Shuichi Kurabayashi",
    "venue": "in Proceedings of the 2020 IEEE Conference on Games (CoG), Online: IEEE, Aug. 2020, pp. 584–587",
    "url": "https://doi.org/10.1109/CoG47356.2020.9231624",
    "forthcoming": false
  },
  {
    "id": "publication-16",
    "year": 2020,
    "title": "An education model for game development by a swedish-japanese industry-academia alliance",
    "authors": "Yukiko Sato, Hiroki Hanaoka, Henrik Engström, and Shuichi Kurabayashi",
    "venue": "in Proceedings of the 2020 IEEE Conference on Games (CoG), Online: IEEE, Aug. 2020, pp. 328–335",
    "url": "https://doi.org/10.1109/CoG47356.2020.9231558",
    "forthcoming": false
  },
  {
    "id": "publication-17",
    "year": 2020,
    "title": "Sketch2map: A game map design support system allowing quick hand sketch prototyping",
    "authors": "Tong Wang and Shuichi Kurabayashi",
    "venue": "in Proceedings of the 2020 IEEE Conference on Games (CoG), Online: IEEE, Aug. 2020, pp. 596–599",
    "url": "https://doi.org/10.1109/CoG47356.2020.9231754",
    "forthcoming": false
  },
  {
    "id": "publication-18",
    "year": 2020,
    "title": "An empirical taxonomy of monetized random reward mechanisms in games",
    "authors": "Yukiko Sato, Stefan Brückner, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "in Proceedings of the 2020 International Conference of the Digital Games Research Association (DiGRA ’20), Tampere, Finland: DiGRA, Jun. 2020",
    "url": "http://www.digra.org/wp-content/uploads/digital-library/DiGRA_2020_paper_168.pdf",
    "forthcoming": false
  },
  {
    "id": "publication-19",
    "year": 2020,
    "title": "Japanese digital games in germany: A case study of gameplay across cultural borders",
    "authors": "Stefan Brückner, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "KEIO SFC JOURNAL, vol. 19, no. 2, pp. 330–350, Mar. 2020, issn: 13472828",
    "url": null,
    "forthcoming": false
  },
  {
    "id": "publication-20",
    "year": 2019,
    "title": "Kinetics: A mathematical model for an on-screen gamepad controllable by finger-tilting",
    "authors": "Shuichi Kurabayashi",
    "venue": "in Extended Abstracts of the Annual Symposium on Computer-Human Interaction in Play Companion Extended Abstracts, Barcelona, Spain: ACM, Oct. 2019, pp. 467–474, isbn: 978-1-4503-6871-1",
    "url": "https://doi.org/10.1145/3341215.3356289",
    "forthcoming": false
  },
  {
    "id": "publication-21",
    "year": 2019,
    "title": "Analyzing random reward mechanics and social perception",
    "authors": "Stefan Brückner, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "in Proceedings of the 2019 International Conference of the Digital Games Research Association (DiGRA ’19), Kyoto, Japan: DiGRA, Aug. 2019",
    "url": null,
    "forthcoming": false
  },
  {
    "id": "publication-22",
    "year": 2019,
    "title": "Exploring cultural differences in game reception: Jrpgs in germany and japan",
    "authors": "Stefan Brückner, Yukiko Sato, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "Transactions of the Digital Games Research Association, vol. 4, no. 3, pp. 209–243, Jun. 2019, issn: 2328-9422",
    "url": "https://doi.org/10.26503/todigra.v4i3.105",
    "forthcoming": false
  },
  {
    "id": "publication-23",
    "year": 2019,
    "title": "Growth control of leaf lettuce with exposure to underwater ultrasound and dissolved oxygen supersaturation",
    "authors": "Yuta Kurashina, Tatsuya Yamashita, Shuichi Kurabayashi, Kenjiro Takemura, and Keita Ando",
    "venue": "Ultrasonics Sonochemistry, vol. 51, pp. 292–297, Mar. 2019, issn: 1350–4177",
    "url": "https://doi.org/10.1016/j.ultsonch.2018.10.005",
    "forthcoming": false
  },
  {
    "id": "publication-24",
    "year": 2018,
    "title": "Exploring cultural differences in game reception: Jrpgs in germany and japan",
    "authors": "Stefan Brückner, Yukiko Sato, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "in Proceedings of the 2018 International Conference of the Digital Games Research Association (DiGRA ’18), Turin, Italy: DiGRA, Jul. 2018",
    "url": null,
    "forthcoming": false
  },
  {
    "id": "publication-25",
    "year": 2018,
    "title": "Lambda containers: A comprehensive anti-tamper framework for games by simulating client behavior in a cloud",
    "authors": "Shuichi Kurabayashi",
    "venue": "in Proceedings of the 2018 IEEE 11th International Conference on Cloud Computing (CLOUD), San Francisco, CA, USA: IEEE, Jul. 2018, pp. 598–605",
    "url": "https://doi.org/10.1109/CLOUD.2018.00083",
    "forthcoming": false
  },
  {
    "id": "publication-26",
    "year": 2018,
    "title": "Ai-driven qa: Simulating massively multiplayer behavior for debugging games",
    "authors": "Shuichi Kurabayashi",
    "venue": "in Game Developers Conference 2018 (GDC), Game Developers Conference: GDC, San Francisco, CA, USA: Informa PLC, Mar. 2018",
    "url": "https://www.gdcvault.com/play/1025406/AI-Driven-QA-Simulating-Massively",
    "forthcoming": false
  },
  {
    "id": "publication-27",
    "year": 2017,
    "title": "The handling of personal information in mobile games",
    "authors": "Stefan Brückner, Yukiko Sato, Shuichi Kurabayashi, and Ikumi Waragai",
    "venue": "in Proceedings of the 14th Conference on Advances in Computer Entertainment Technology (ACE 2017), London, UK: Springer, Cham, Dec. 2017, pp. 415–429",
    "url": "https://doi.org/10.1007/978-3-319-76270-8_29",
    "forthcoming": false
  },
  {
    "id": "publication-28",
    "year": 2017,
    "title": "Construction and evaluation of an integrated formal/informal learning environment for foreign language learning across real and virtual spaces",
    "authors": "Ikumi Waragai, Tatsuya Ohta, Shuichi Kurabayashi, Yasushi Kiyoki, Yukiko Sato, and Stefan Brückner",
    "venue": "in CALL in a climate of change: adapting to turbulent global conditions - short papers from EUROCALL 2017, Research-publishing.net, Dec. 2017, pp. 322–327",
    "url": "https://doi.org/10.14705/rpnet.2017.eurocall2017.734",
    "forthcoming": false
  },
  {
    "id": "publication-29",
    "year": 2017,
    "title": "A large-scale visual check-in system for tv content-aware web with client-side video analysis offloading",
    "authors": "Shuichi Kurabayashi and Hiroki Hanaoka",
    "venue": "in Proceedings of the 18th International Conference on Web Information Systems Engineering (WISE 2017), ser. Lecture Notes in Computer Science, vol. 10570, Moscow, Russia: Springer, Cham, Oct. 2017, pp. 159–174",
    "url": "https://doi.org/10.1007/978-3-319-68786-5_13",
    "forthcoming": false
  },
  {
    "id": "publication-30",
    "year": 2016,
    "title": "Sensing-by-overlaying: A practical implementation of a multiplayer mixed-reality gaming system by integrating a dense point cloud and a real-time camera",
    "authors": "Shuichi Kurabayashi, Hidetoshi Ishiyama, and Masaru Kanai",
    "venue": "in Proceedings of the 18th IEEE International Symposium on Multimedia (ISM 2016), San Jose, CA, USA: IEEE, Dec. 2016, pp. 636–639",
    "url": "https://doi.org/10.1109/ISM.2016.0136",
    "forthcoming": false
  },
  {
    "id": "publication-31",
    "year": 2016,
    "title": "Create a 20 times faster database engine optimized to mmogs",
    "authors": "Shuichi Kurabayashi",
    "venue": "in Game Developers Conference Europe 2016 (GDC Europe), Cologne, Germany: Informa PLC, Aug. 2016",
    "url": "https://www.gdcvault.com/play/1023800/Create-a-20-Times-Faster",
    "forthcoming": false
  },
  {
    "id": "publication-32",
    "year": 2016,
    "title": "Monochrome glove: A robust real-time hand gesture recognition method by using a fabric glove with design of structured markers",
    "authors": "Hidetoshi Ishiyama and Shuichi Kurabayashi",
    "venue": "in Proceedings of the 2016 IEEE Virtual Reality (VR), Greenville, SC, USA: IEEE, Mar. 2016, pp. 187–188",
    "url": "https://doi.org/10.1109/VR.2016.7504716",
    "forthcoming": false
  }
];
