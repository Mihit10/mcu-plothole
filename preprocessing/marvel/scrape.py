from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

# === Your initial list of movies ===
movies = [
    {
        "title": "Captain America: The First Avenger",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_The_First_Avenger",
        "universe": "Earth-199999",
        "release_date": "22-Jul-2011"
    },
    {
        "title": "Agent Carter",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Marvel_One-Shot:_Agent_Carter",
        "universe": "Earth-199999",
        "release_date": "24-Sep-2013"
    },
    {
        "title": "Captain Marvel",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Captain_Marvel_(film)",
        "universe": "Earth-199999",
        "release_date": "8-Mar-2019"
    },
    {
        "title": "Iron Man",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_(film)",
        "universe": "Earth-199999",
        "release_date": "2-May-2008"
    },
    {
        "title": "Iron Man 2",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_2",
        "universe": "Earth-199999",
        "release_date": "7-May-2010"
    },
    {
        "title": "The Incredible Hulk",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/The_Incredible_Hulk",
        "universe": "Earth-199999",
        "release_date": "13-Jun-2008"
    },
    {
        "title": "A Funny Thing Happened on the Way to Thor's Hammer",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Marvel_One-Shot:_A_Funny_Thing_Happened_on_the_Way_to_Thor%27s_Hammer",
        "universe": "Earth-199999",
        "release_date": "25-Nov-2011"
    },
    {
        "title": "Thor",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Thor_(film)",
        "universe": "Earth-199999",
        "release_date": "6-May-2011"
    },
    {
        "title": "The Consultant",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Marvel_One-Shot:_The_Consultant",
        "universe": "Earth-199999",
        "release_date": "13-Sep-2011"
    },
    {
        "title": "Avengers: Assemble",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/The_Avengers",
        "universe": "Earth-199999",
        "release_date": "4-May-2012"
    },
    {
        "title": "Item 47",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Marvel_One-Shot:_Item_47",
        "universe": "Earth-199999",
        "release_date": "25-Sep-2012"
    },
    {
        "title": "Iron Man 3",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_3",
        "universe": "Earth-199999",
        "release_date": "3-May-2013"
    },
    {
        "title": "Thor: The Dark World",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Thor:_The_Dark_World",
        "universe": "Earth-199999",
        "release_date": "8-Nov-2013"
    },
    {
        "title": "All Hail the King",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Marvel_One-Shot:_All_Hail_the_King",
        "universe": "Earth-199999",
        "release_date": "4-Feb-2014"
    },
    {
        "title": "Captain America: The Winter Soldier",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_The_Winter_Soldier",
        "universe": "Earth-199999",
        "release_date": "4-Apr-2014"
    },
    {
        "title": "Guardians of the Galaxy",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Guardians_of_the_Galaxy_(film)",
        "universe": "Earth-199999",
        "release_date": "1-Aug-2014"
    },
    {
        "title": "Guardians of the Galaxy Vol. 2",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Guardians_of_the_Galaxy_Vol._2",
        "universe": "Earth-199999",
        "release_date": "5-May-2017"
    },
    {
        "title": "Avengers: Age of Ultron",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Age_of_Ultron",
        "universe": "Earth-199999",
        "release_date": "1-May-2015"
    },
    {
        "title": "Ant-Man",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Ant-Man_(film)",
        "universe": "Earth-199999",
        "release_date": "17-Jul-2015"
    },
    {
        "title": "Captain America: Civil War",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_Civil_War",
        "universe": "Earth-199999",
        "release_date": "6-May-2016"
    },
    {
        "title": "Black Widow",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Black_Widow_(film)",
        "universe": "Earth-199999",
        "release_date": "6-Nov-2020"
    },
    {
        "title": "Black Panther",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Black_Panther_(film)",
        "universe": "Earth-199999",
        "release_date": "16-Feb-2018"
    },
    {
        "title": "Spider-Man: Homecoming",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_Homecoming",
        "universe": "Earth-199999",
        "release_date": "7-Jul-2017"
    },
    {
        "title": "Doctor Strange",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Doctor_Strange_(film)",
        "universe": "Earth-199999",
        "release_date": "4-Nov-2016"
    },
    {
        "title": "Ant-Man & The Wasp",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Ant-Man_and_the_Wasp",
        "universe": "Earth-199999",
        "release_date": "6-Jul-2018"
    },
    {
        "title": "Avengers: Infinity War",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Infinity_War",
        "universe": "Earth-199999",
        "release_date": "27-Apr-2018"
    },
    {
        "title": "Avengers: Endgame",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Endgame",
        "universe": "Earth-199999",
        "release_date": "3-May-2019"
    },
    {
        "title": "Avengers: Endgame",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Endgame",
        "universe": "Earth-199999",
        "release_date": "3-May-2019"
    },
    {
        "title": "Shang-Chi and the Legend of the Ten Rings",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Shang-Chi_and_the_Legend_of_the_Ten_Rings",
        "universe": "Earth-199999",
        "release_date": "9-Jul-2021"
    },
    {
        "title": "Peter's To-Do List",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Peter%27s_To-Do_List",
        "universe": "Earth-199999",
        "release_date": "1-Oct-2019"
    },
    {
        "title": "Spider-Man: Far From Home",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_Far_From_Home",
        "universe": "Earth-199999",
        "release_date": "5-Jul-2019"
    },
    {
        "title": "Spider-Man: No Way Home",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_No_Way_Home",
        "universe": "Earth-199999",
        "release_date": "17-Dec-2021"
    },
    {
        "title": "Spider-Man: No Way Home",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_No_Way_Home",
        "universe": "Earth-199999",
        "release_date": "17-Dec-2021"
    },
    {
        "title": "Eternals",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Eternals_(film)",
        "universe": "Earth-199999",
        "release_date": "5-Nov-2021"
    },
    {
        "title": "Doctor Strange in the Multiverse of Madness",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Doctor_Strange_in_the_Multiverse_of_Madness",
        "universe": "Earth-199999",
        "release_date": "6-May-2022"
    },
    {
        "title": "Black Panther: Wakanda Forever",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Black_Panther:_Wakanda_Forever",
        "universe": "Earth-199999",
        "release_date": "11-Nov-2022"
    },
    {
        "title": "Thor: Love and Thunder",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Thor:_Love_and_Thunder",
        "universe": "Earth-199999",
        "release_date": "8-Jul-2022"
    },
    {
        "title": "Werewolf by Night",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Werewolf_by_Night_(TV_special)",
        "universe": "Earth-199999",
        "release_date": "7-Oct-2022"
    },
    {
        "title": "Guardians of the Galaxy: The Holiday Special",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/The_Guardians_of_the_Galaxy_Holiday_Special",
        "universe": "Earth-199999",
        "release_date": "25-Nov-2022"
    },
    {
        "title": "Guardians of the Galaxy Vol. 3",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Guardians_of_the_Galaxy_Vol._3",
        "universe": "Earth-199999",
        "release_date": "5-May-2023"
    },
    {
        "title": "The Marvels",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/The_Marvels",
        "universe": "Earth-199999",
        "release_date": "10-Nov-2023"
    },
    {
        "title": "Captain America: Brave New World",
        "link": "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_Brave_New_World",
        "universe": "Earth-199999",
        "release_date": "14-Feb-2025"
    },

    # Add more movies here...
]

# === Set up headless Chrome for Selenium ===
options = Options()
options.add_argument("--headless")  # Run in headless mode (no GUI)
options.add_argument("--disable-gpu")  # Disable GPU acceleration
options.add_argument("--no-sandbox")  # Required in some restricted environments like Kaggle
options.add_argument("--disable-dev-shm-usage")  # Avoid shared memory crashes
options.add_argument("--window-size=1920,1080")  # Set viewport size
options.add_argument("--ignore-certificate-errors")  # Ignore SSL cert errors
options.add_argument("--allow-insecure-localhost")  # Allow localhost with bad certs
options.add_argument("--allow-running-insecure-content")  # Allow mixed content (HTTP inside HTTPS)
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")  # Realistic UA
driver = webdriver.Chrome(options=options)

# === Helper to extract a section (plot/synopsis) ===
def extract_section(soup, section_id):
    section = soup.find("span", {"class": "mw-headline", "id": section_id})
    if not section:
        return None
    content = []
    for sibling in section.parent.find_next_siblings():
        if sibling.name and sibling.name.startswith("h"):
            break
        content.append(sibling.get_text(strip=True))
    return "\n".join(content)

# === Main scraping loop ===
for movie in movies:
    print(f"Scraping: {movie['title']}")
    driver.get(movie['link'])
    time.sleep(3)  # Wait for the page to load fully

    soup = BeautifulSoup(driver.page_source, "html.parser")
    
    movie["synopsis"] = extract_section(soup, "Synopsis")
    print(movie["synopsis"])
    movie["plot"] = extract_section(soup, "Plot")
    print(movie["plot"])


driver.quit()

# === Output result ===
import pprint
pprint.pprint(movies)

import json

with open("mcu_movies_data.json", "w", encoding="utf-8") as f:
    json.dump(movies, f, ensure_ascii=False, indent=4)

print("✅ Data exported to mcu_movies_data.json")

print(f"Total movies scraped: {len(movies)}")

