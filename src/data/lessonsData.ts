import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 0,
    stageNumber: '01',
    tag: 'FOUNDATION · 20 MIN',
    timeEstimate: '20 min',
    title: 'Data Analytics kya hai?',
    titleUrdu: 'ڈیٹا اینالیٹکس کیا ہے اور اس کی کیا اہمیت ہے؟',
    shortDesc: 'Data ko collect, clean, study aur explain karke better decisions lena. Example: shop ki daily sales samajhna.',
    shortDescUrdu: 'ڈیٹا جمع کرنا، صاف کرنا، اس کا تجزیہ کرنا اور اس کی مدد سے بہتر کاروباری فیصلے کرنا۔',
    task: 'Practice: Apne ghar ya shop ke 5 daily expenses ki list banayein.',
    taskUrdu: 'مشق: اپنے گھر یا دکان کے روزمرہ کے 5 اخراجات کی فہرست بنائیں اور کل خرچ معلوم کریں۔',
    category: 'foundation',
    concepts: [
      'Raw Data vs Information',
      'Descriptive vs Predictive Analytics',
      'Data Lifecycle: Collect → Clean → Analyze → Visualize → Act',
      'Business Decision Making'
    ],
    urduExplanation: `Data Analytics ka matlab hai kacha (raw) data le kar usko aisi maloomat mein tabdeel karna jisse karobaar mein munafa barhe aur nuqsan kam ho.

Misaal ke tor par: Ek dukandar rozana 50 cheezein bechta hai. Agar wo sirf dimagh mein hisab rakhe ga to usay pata nahi chalega k konsi product sab se ziada bik rahi hai, konsa din sab se busy hai, aur kis item par munafa ziada hai.

Jab hum data analytics apply karte hain:
1. Rozana ki sales note karte hain (Data Collection).
2. Ghaltiyan aur missing records theek karte hain (Data Cleaning).
3. Sum, Average aur trends nikaalte hain (Analysis).
4. Charts aur graphs mein dikhate hain (Visualization).
5. Phir faisla karte hain k konsa maal mazeed mangwana hai (Decision Making).`,
    englishExplanation: `Data Analytics is the process of collecting, inspecting, cleaning, transforming, and modeling raw data to discover actionable insights and make informed business decisions.

Instead of guessing, companies use analytics to understand:
- What happened? (Descriptive Analytics)
- Why did it happen? (Diagnostic Analytics)
- What will happen next? (Predictive Analytics)
- What should we do about it? (Prescriptive Analytics)`,
    realWorldExample: {
      scenario: 'Tariq Road Karachi Retail Mart: Understanding Best Sellers',
      scenarioUrdu: 'طارق روڈ کراچی کا ریٹیل اسٹور: بہترین فروخت ہونے والی اشیاء کا جائزہ',
      dataSnippet: `Date, Item, Quantity, Price_PKR, Total_PKR
2026-10-01, Cotton Kurti, 12, 2500, 30000
2026-10-01, Silk Dupatta, 5, 1200, 6000
2026-10-02, Cotton Kurti, 18, 2500, 45000
2026-10-02, Embroidered Shawl, 3, 5000, 15000`,
      lessonTakeaway: 'Data show karta hai k Cotton Kurti regular cash flow deti hai jabke Shawl high-margin product hai. Dono ka balance rakhna zaroori hai.'
    },
    interactiveExercise: {
      type: 'calculation',
      prompt: 'Ek store ne Monday ko Rs. 4,200, Tuesday ko Rs. 5,800, aur Wednesday ko Rs. 3,500 kamaye. Teeno dino ki total sales kitni hai?',
      promptUrdu: 'ایک دکان نے پیر کو 4,200، منگل کو 5,800 اور بدھ کو 3,500 روپے کمائے۔ کل رقم کیا ہے؟',
      hint: '4200 + 5800 + 3500 ko jama karein',
      solution: ['13500', '13,500', 'rs 13500', 'rs. 13,500', '13500 pkr'],
      explanation: 'Shabash! 4,200 + 5,800 + 3,500 = Rs. 13,500 total sales amount hai.'
    }
  },
  {
    id: 1,
    stageNumber: '02',
    tag: 'SPREADSHEETS · 30 MIN',
    timeEstimate: '30 min',
    title: 'Excel / Google Sheets basics',
    titleUrdu: 'ایکسل اور گوگل شیٹس کی بنیادی مہارتیں',
    shortDesc: 'Rows, columns, cells, SUM, AVERAGE, sorting aur filters seekhein.',
    shortDescUrdu: 'سیلز، فارمولے (SUM, AVERAGE, COUNTIF)، ڈیٹا کی ترتیب (Sorting) اور فلٹرز۔',
    task: 'Practice: 7 din ki sales likhein aur =SUM(B2:B8) se total nikalein.',
    taskUrdu: 'مشق: 7 دن کی سیلز شیٹ بنائیں اور =SUM فارمولے سے کل سیلز حاصل کریں۔',
    category: 'spreadsheets',
    concepts: [
      'Grid Coordinates: Rows (1,2,3), Columns (A,B,C), Cells (A1, B4)',
      'Basic Formulas: =SUM(), =AVERAGE(), =MIN(), =MAX(), =COUNT()',
      'Conditional Counting: =COUNTIF(), =SUMIF()',
      'Filters & Multi-Level Sorting',
      'Absolute vs Relative Reference ($A$1 vs A1)'
    ],
    urduExplanation: `Excel aur Google Sheets har data analyst ka sab se pehla aur ahem hathyar hain. 80% corporate analysis spreadsheets mein shuru hota hai.

Bunyadi qawaid:
- Har formula hamesha barabar ke nishan (=) se shuru hota hai.
- Agar B2 se B8 tak tamaam values jama karni hon, to hum likhtey hain: =SUM(B2:B8)
- Agar ausat (average) maloom karna ho: =AVERAGE(B2:B8)
- Agar sirf wo orders ginnay hon jo 5000 se baray hain: =COUNTIF(B2:B8, ">5000")

Sorting ka faida: Sab se mehangi ya sasti products ko foran uper ya neechay dekhna.
Filters ka faida: Kisi makhsoos shehar ya category ka data alag karke analyze karna.`,
    englishExplanation: `Spreadsheets are the bread and butter of data analytics. Every cell has a coordinate (Column Letter + Row Number, like C4).

Key formulas:
- =SUM(range): Adds all numbers in range
- =AVERAGE(range): Computes arithmetic mean
- =COUNTIF(range, criteria): Counts cells meeting condition
- =SUMIF(range, criteria, sum_range): Sums cells conditional on criteria
- Absolute referencing with $ locks row/column ($B$2) during drag-fill.`,
    realWorldExample: {
      scenario: 'Weekly Grocery Store Sales in Lahore (Cells B2 to B8)',
      scenarioUrdu: 'لاہور گروسری اسٹور کی ہفتہ وار سیلز شیٹ',
      dataSnippet: `Day, Sales_PKR
Monday, 12000
Tuesday, 14500
Wednesday, 11000
Thursday, 13000
Friday, 18500
Saturday, 24000
Sunday, 22000`,
      lessonTakeaway: '=SUM(B2:B8) returns 115,000 PKR. Weekend sales (Fri-Sun) account for 56% of total revenue!'
    },
    interactiveExercise: {
      type: 'formula',
      prompt: 'Cell range C2 se C10 tak ki tamam values ka average nikaalne ke liye konsa Excel formula likhein ge?',
      promptUrdu: 'سیل رینج C2 سے C10 کا اوسط (Average) نکالنے کا صحیح فارمولا کیا ہے؟',
      hint: 'Formula "=" se shuru hota hai, phir AVERAGE aur bracket mein range',
      solution: ['=AVERAGE(C2:C10)', '=average(c2:c10)', 'AVERAGE(C2:C10)', 'average(c2:c10)'],
      explanation: 'Zabardast! =AVERAGE(C2:C10) tamam cells ki values ko jama karke unki tadad (9) se divide karega.'
    }
  },
  {
    id: 2,
    stageNumber: '03',
    tag: 'QUALITY · 30 MIN',
    timeEstimate: '30 min',
    title: 'Data cleaning',
    titleUrdu: 'ڈیٹا کلیننگ: خراب اور غیر معیاری ڈیٹا کی درستگی',
    shortDesc: 'Duplicate rows, blank cells, inconsistent dates aur spelling errors identify karein.',
    shortDescUrdu: 'ڈپلیکیٹ ریکارڈز، خالی خانے، تاریخ کے مختلف فارمیٹس اور اسپیلنگ کی غلطیاں درست کرنا۔',
    task: 'Practice: Ek sample list mein duplicate customer names dhoondein.',
    taskUrdu: 'مشق: کسٹمر لسٹ میں سے ڈپلیکیٹ اندراجات اور خالی فون نمبرز کی نشاندہی کریں۔',
    category: 'quality',
    concepts: [
      'Garbage In, Garbage Out (GIGO) principle',
      'Handling Missing / Null Values (Imputation vs Drop)',
      'Removing Duplicates & Trimming Spaces',
      'Standardizing Dates (YYYY-MM-DD)',
      'Categorical Typos (e.g., "Lahore", "LHR", "lahore ")'
    ],
    urduExplanation: `Data Analytics ka sunehra usool hai: "Kachra andar aye ga to faisla bhi kachra hi hoga" (Garbage In, Garbage Out).

Asal dunya mein data kabhi saaf nahi milta:
1. Duplicate Records: Ek hi order do martaba enter ho jata hai.
2. Missing / Blank Values: Customer ne phone number ya address khali chhor diya.
3. Spelling Typos: Kisi ne "Karachi" likha, kisi ne "Khi", kisi ne "karachi ". System in teeno ko alag shehar samjhe ga!
4. Space Issues: Naam ke aagey peechay izafi spaces (TRIM function se remove karein).
5. Inconsistent Dates: Kisi ne 05/10/2026 likha aur kisi ne 10-05-2026.

Jab tak data saaf na ho, graphs aur statistics jhooti maloomat denge.`,
    englishExplanation: `Data cleaning is often 60-80% of an analyst's daily time. Dirty data distorts metrics, inflates counts, and leads to incorrect business decisions.

Key Cleaning Steps:
1. De-duplication: Removing duplicate IDs or transaction hashes.
2. Handling Nulls: Deciding whether to drop rows or impute with Mean/Median/Mode.
3. Whitespace Trimming: Eliminating leading/trailing spaces.
4. Value Standardization: Mapping variants ("PK", "Pak", "Pakistan") to a single canonical value.
5. Outlier Detection: Identifying impossible values (e.g., Age = 250, Price = -50).`,
    realWorldExample: {
      scenario: 'Messy E-Commerce Customer Database',
      scenarioUrdu: 'ای کامرس کسٹمر ریکارڈز کی صفائی',
      dataSnippet: `CustomerID, CustomerName, City, OrderAmount
101, Ahmed Khan, Karachi, 3500
102, Fatima Ali,  Lahore , 4200
103, Ahmed Khan, karachi, 3500   <-- Duplicate ID 101
104, Bilal Sheikh, LHR, NULL      <-- City variant & Missing Amount`,
      lessonTakeaway: 'Row 103 duplicate hai, Row 102 mein space hai, aur Row 104 mein amount missing hai aur shehar "LHR" likha hai.'
    },
    interactiveExercise: {
      type: 'cleaning',
      prompt: 'Customer column mein "  Karachi  " likha hai jisme extra spaces hain. Excel mein leading aur trailing spaces hatane ke liye konsa function use hota hai?',
      promptUrdu: 'غیر ضروری اسپیسز (Extra Spaces) ختم کرنے کے لیے ایکسل میں کونسا فنکشن استعمال ہوتا ہے؟',
      hint: 'T se shuru hota hai (4 letters)',
      solution: ['=TRIM()', 'TRIM', '=trim()', 'trim', '=TRIM', 'trim()'],
      explanation: 'Sahi jawab! =TRIM(A2) function text ke shuru aur aakhir ki fuzool spaces ko khatam kar deta hai.'
    }
  },
  {
    id: 3,
    stageNumber: '04',
    tag: 'DATABASE · 40 MIN',
    timeEstimate: '40 min',
    title: 'SQL fundamentals',
    titleUrdu: 'ایس کیو ایل (SQL) اور ڈیٹابیس کے بنیادی اصول',
    shortDesc: 'SELECT, WHERE, ORDER BY aur GROUP BY se database se useful answers nikaalein.',
    shortDescUrdu: 'ڈیٹابیس سے مطلوبہ ریکارڈز نکالنا، فلٹر کرنا اور گروپ بنا کر اعداد و شمار حاصل کرنا۔',
    task: 'Practice: SELECT * FROM sales WHERE amount > 1000; ka meaning samjhein.',
    taskUrdu: 'مشق: مطلوبہ سوالات کے لیے بنیادی ایس کیو ایل کیوریز لکھیں اور چلائیں۔',
    category: 'database',
    concepts: [
      'Relational Databases & Tables',
      'SELECT & FROM (Retrieving columns)',
      'WHERE clause with conditions (=, >, <, LIKE, IN, AND, OR)',
      'ORDER BY (ASC / DESC sorting)',
      'GROUP BY & Aggregate Functions (COUNT, SUM, AVG)',
      'HAVING vs WHERE'
    ],
    urduExplanation: `SQL (Structured Query Language) databases se baat karne ki aalmi zaban hai. Jab data hazaron ya laakhon rows par mushtamil ho, to Excel crash ho jata hai—wahan SQL kaam aati hai.

Ahem SQL Clauses:
- SELECT: Konsi columns chahiyein? (e.g., SELECT customer_name, city)
- FROM: Kis table se data lana hai? (e.g., FROM orders)
- WHERE: Filter lagana (e.g., WHERE amount > 5000 AND city = 'Islamabad')
- GROUP BY: Groups banana (e.g., har shehar ki total sales nikaalne k liye: GROUP BY city)
- ORDER BY: Tarteeb dena (e.g., ORDER BY total_amount DESC taake sab se baray orders uper aaein).`,
    englishExplanation: `SQL is the industry standard for querying relational databases (PostgreSQL, MySQL, BigQuery, Snowflake).

SQL Order of Execution:
1. FROM & JOIN (Locate tables)
2. WHERE (Filter rows)
3. GROUP BY (Aggregate data)
4. HAVING (Filter grouped groups)
5. SELECT (Choose output columns)
6. ORDER BY (Sort results)
7. LIMIT (Cap return count)`,
    realWorldExample: {
      scenario: 'Daraz Database: Finding High-Value Customers in Lahore',
      scenarioUrdu: 'لاہور کے بڑے آرڈرز نکالنے کی ایس کیو ایل کیوری',
      dataSnippet: `SELECT customer_name, order_date, amount_pkr
FROM orders
WHERE city = 'Lahore' AND amount_pkr >= 10000
ORDER BY amount_pkr DESC;`,
      lessonTakeaway: 'Yeh query foran database ke 10 laakh records mein se sirf Lahore ke VIP orders filter karke sort kar deti hai.'
    },
    interactiveExercise: {
      type: 'sql',
      prompt: 'Sales table se un tamam rows ko select karne ki query complete karein jahan city "Karachi" ho: SELECT * FROM sales WHERE ...',
      promptUrdu: 'جہاں شہر "Karachi" ہو، اس کو فلٹر کرنے کی شرط لکھیں: SELECT * FROM sales WHERE ...',
      hint: "city = 'Karachi'",
      solution: ["city = 'Karachi'", 'city = "Karachi"', "city='Karachi'", 'city="Karachi"', "city = 'karachi'"],
      explanation: "Durust! WHERE city = 'Karachi' sirf Karachi ke records laaye gi."
    }
  },
  {
    id: 4,
    stageNumber: '05',
    tag: 'PYTHON · 45 MIN',
    timeEstimate: '45 min',
    title: 'Python for analysis',
    titleUrdu: 'ڈیٹا اینالیسس کے لیے پائتھن (Python) اور پانڈاس (Pandas)',
    shortDesc: 'Python basics aur Pandas ka intro: CSV read karna, filter karna aur summary banana.',
    shortDescUrdu: 'پائتھن کی مدد سے بڑی فائلز لوڈ کرنا، سمرائز کرنا اور آٹومیشن کرنا۔',
    task: 'Practice: Pandas mein df.head() aur df.describe() ka purpose likhein.',
    taskUrdu: 'مشق: پانڈاس کی اہم کمانڈز (read_csv, head, describe, groupby) کا استعمال سمجھیں۔',
    category: 'python',
    concepts: [
      'Why Python? Automation, Scale, & Machine Learning Ready',
      'Pandas DataFrame & Series',
      'Loading Data: pd.read_csv("filename.csv")',
      'Inspection: df.head(), df.info(), df.describe(), df.shape',
      'Filtering: df[df["sales"] > 5000]',
      'Aggregation: df.groupby("category")["sales"].sum()'
    ],
    urduExplanation: `Python data analysts aur data scientists ki sab se pasandeeda programming language hai. Iski library "Pandas" tables ke data ke sath khelne ke liye jaadooi salahiyat rakhti hai.

Chaar ahem commands jo har analyst ko yaad honi chahiyein:
1. import pandas as pd: Library ko program mein shamil karna.
2. df = pd.read_csv('sales.csv'): CSV file ko memory mein table (DataFrame) bana kar load karna.
3. df.head(): Table ki pehli 5 rows dekhna taake columns ka andaza ho sakay.
4. df.describe(): Puri table ke numbers ka foran Mean, Min, Max aur Standard Deviation nikaal dena!
5. df.groupby('City')['Sales'].sum(): Har shehar ki kul sales ek second mein calculate karna.`,
    englishExplanation: `Python with Pandas allows reproducible, automated data manipulation capable of handling gigabytes of data that crash traditional GUI spreadsheets.

Common Pandas workflow:
- df = pd.read_csv('data.csv')
- print(df.shape)  # (rows, columns)
- print(df.isna().sum())  # missing values per column
- df_clean = df.drop_duplicates().dropna()
- summary = df_clean.groupby('Region')['Revenue'].agg(['count', 'mean', 'sum'])`,
    realWorldExample: {
      scenario: 'Automating Daily Sales Reports with Pandas',
      scenarioUrdu: 'روزانہ کی سیلز رپورٹ کو پائتھن سے آٹومیٹ کرنا',
      dataSnippet: `import pandas as pd

df = pd.read_csv("daily_sales.csv")
top_products = df.groupby("Product")["Revenue"].sum().sort_values(ascending=False).head(5)
print("Top 5 Revenue Generators:")
print(top_products)`,
      lessonTakeaway: 'Jo kaam Excel mein 30 minute lagata hai, Python script 2 second mein baghair kisi insani ghalti ke poora kar deti hai.'
    },
    interactiveExercise: {
      type: 'python',
      prompt: 'Pandas DataFrame "df" ki pehli 5 rows dekhne ke liye konsa function call kiya jata hai?',
      promptUrdu: 'پائتھن پانڈاس میں ٹیبل کی پہلی 5 سطریں (rows) دیکھنے کے لیے کونسا میتھڈ استعمال ہوتا ہے؟',
      hint: 'df.h...()',
      solution: ['df.head()', 'head()', 'df.head', 'head', 'df.head(5)'],
      explanation: 'Bilkul sahi! df.head() default tor par pehli 5 rows display karta hai.'
    }
  },
  {
    id: 5,
    stageNumber: '06',
    tag: 'VISUALIZATION · 45 MIN',
    timeEstimate: '45 min',
    title: 'Power BI dashboards',
    titleUrdu: 'پاور بی آئی (Power BI) ڈیش بورڈز اور ڈیٹا وژولائزیشن',
    shortDesc: 'Charts, KPI cards, filters aur interactive reports banana seekhein.',
    shortDescUrdu: 'اعداد و شمار کو دیدہ زیب چارٹس، کے پی آئی کارڈز اور انٹرایکٹو رپورٹس میں بدلنا۔',
    task: 'Practice: Monthly sales ke liye bar chart aur total-sales card plan karein.',
    taskUrdu: 'مشق: سیلز کے لیے کے پی آئی کارڈز اور بار چارٹ کی منصوبہ بندی کریں۔',
    category: 'visualization',
    concepts: [
      'Choosing the Right Chart (Bar vs Line vs Donut vs Scatter)',
      'KPI Cards (Big Number Display with % Change)',
      'Slicers and Cross-filtering',
      'Color Discipline: Neutral background, high-contrast accents',
      'Dashboard Layout: Top-level metrics at top, detailed trends below'
    ],
    urduExplanation: `Ek tasveer hazar lafzon se behtar hoti hai. Business executives ke paas 50,000 rows parhne ka waqt nahi hota. Wo ek jhalak mein decision lena chahte hain—yahan Power BI aur Dashboards kaam aate hain.

Dashboard design ke 4 usool:
1. Top Bar / KPI Cards: Sab se ahem numbers uper hon (Total Revenue, Total Orders, Average Order Value).
2. Waqt ka rujhan (Trend Over Time): Mahana ya rozana sales ke liye Line Chart behtareen hai.
3. Category Comparison: Products ya sheharon ka mawazna karne ke liye Bar Chart use karein.
4. Slicers: Filter buttons jisse manager sirf "Lahore" ya sirf "Electronics" select karke pura dashboard update dekh sakay.`,
    englishExplanation: `Data visualization bridges the gap between raw analytical queries and executive decision-making. Power BI provides dynamic DAX measures, interactive slicers, and seamless drill-downs.

Visual selection rules:
- Comparison across categories: Horizontal or Vertical Bar Chart
- Change over time: Line or Area Chart
- Part to whole (3-5 categories max): Donut Chart
- Single critical metric: KPI Scorecard with trend indicator`,
    realWorldExample: {
      scenario: 'Executive Sales Dashboard for Pakistan E-Commerce FMCG',
      scenarioUrdu: 'ایگزیکٹو سیلز ڈیش بورڈ کی ترتیب',
      dataSnippet: `KPIs:
- Total Revenue: PKR 4.82 Million (+14% vs last month)
- Total Delivered Orders: 3,420
- Average Basket Size: PKR 1,409
- Return / Cancellation Rate: 2.8% (Target: < 3%)`,
      lessonTakeaway: 'CEO sirf in 4 cards ko dekh kar 10 second mein company ki sehat samajh sakta hai.'
    },
    interactiveExercise: {
      type: 'insights',
      prompt: 'Waqt ke sath sath (Time series, e.g., Jan se Dec tak) sales ka rujhan (trend) dekhne ke liye sab se mozoo chart konsa hai? (Bar, Line, ya Pie?)',
      promptUrdu: 'وقت کے ساتھ ساتھ سیلز کا رجحان ظاہر کرنے کے لیے سب سے بہترین چارٹ کونسا ہے؟',
      hint: 'Points ko aapas mein jor kar line banti hai',
      solution: ['line', 'line chart', 'line graph', 'لائن چارٹ'],
      explanation: 'Sahi jawab! Line chart waqt ke sath continuous trend aur seasonality dikhane ke liye behtareen hai.'
    }
  },
  {
    id: 6,
    stageNumber: '07',
    tag: 'REAL PROJECT · 60 MIN',
    timeEstimate: '60 min',
    title: 'Portfolio project',
    titleUrdu: 'پورٹ فولیو پروجیکٹ: نوکری اور فری لانسنگ کے لیے عملی کام',
    shortDesc: 'Sales dataset clean karein, analysis karein, dashboard banayein aur findings explain karein.',
    shortDescUrdu: 'مکمل پروجیکٹ: ڈیٹا کلیننگ سے لے کر 3 بزنس بصیرتیں اور 2 سفارشات تیار کرنا۔',
    task: 'Practice: 3 insights aur 2 business recommendations likhein.',
    taskUrdu: 'مشق: ڈیٹا کا تجزیہ کر کے 3 اہم نتائج (Insights) اور 2 کاروباری تجاویز تحریر کریں۔',
    category: 'project',
    concepts: [
      'Problem Statement & Business Context',
      'End-to-End Pipeline: Raw CSV → Clean Table → Visuals → Business Value',
      'Storytelling with Data (What, So What, Now What?)',
      'GitHub README & LinkedIn Project Showcase',
      'How to ace the Data Analyst interview'
    ],
    urduExplanation: `Sirf certificates jama karne se job ya freelance order nahi milta. Hiring manager ya client yeh dekhna chahta hai k kya aap real business problem solve kar sakte hain?

Aapka Capstone Portfolio Project:
1. Ek real dataset lein (maslan hamari Practice Lab se Store Sales CSV).
2. Data ko clean karein (missing values aur duplicates hatayein).
3. 3 Key Business Insights nikaalein (Maslan: Weekend par 40% sales aati hai, Karachi se sab se ziada orders hain, aur electronics par return rate ziada hai).
4. 2 Actionable Recommendations dein (Maslan: Friday Sham ko discount campaign chalayein taake weekend boost ho, aur electronics ki packaging behtar karein).
5. Ek khubsurat 1-page summary aur dashboard bana kar apne portfolio mein lagayein!`,
    englishExplanation: `A portfolio project proves competence far better than credentials alone. The golden formula for analytics storytelling:
1. Context: What problem did the company face?
2. Method: What data did you audit, clean, and analyze?
3. Insights (What did the data reveal?): Concrete numbers with percentage impacts.
4. Recommendations (What should leadership do?): Specific, actionable commercial steps.`,
    realWorldExample: {
      scenario: 'Final Portfolio Showcase Presentation',
      scenarioUrdu: 'فائنل پورٹ فولیو پروجیکٹ سمری',
      dataSnippet: `Project Title: Retail Optimization Analysis
Dataset: 12-Month Sales Records (15,000 transactions)
Tools Used: Excel Data Cleaning, SQL Querying, Power BI Dashboard
Business Impact: Identified underperforming store locations and saved 8% in inventory holding costs.`,
      lessonTakeaway: 'Yeh project aapke resume aur LinkedIn profile par aapko 90% ummeedwaron se aagey le jaye ga.'
    },
    interactiveExercise: {
      type: 'insights',
      prompt: 'Data story sunate waqt: "What happened" ke baad agla sab se zaroori sawal kya hota hai? (A: "So what? / Why does it matter?", ya B: "File ka size kya tha?")',
      promptUrdu: 'ڈیٹا اینالسٹ کو یہ بتانے کے بعد کہ کیا ہوا، اگلا کیا سمجھانا چاہیے؟ (So what / کاروبار پر اثر)',
      hint: 'Option A ya B likhein',
      solution: ['a', 'option a', 'so what', 'so what?', 'why does it matter'],
      explanation: 'Zabardast! Decision makers ko numbers ka business par asar ("So What?") aur agla qadam ("Now What?") janna hota hai.'
    }
  }
];
