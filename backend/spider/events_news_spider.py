import json

import requests
from bs4 import BeautifulSoup


# events are scraped from https://sdg.iisd.org/events/
# news are scraped from https://sdg.iisd.org/news/
def get_events_and_news_by_page_number(content_type, page_no):
    url = "https://sdg.iisd.org/wp-admin/admin-ajax.php"
    payload = 'post_type=' + content_type + '&behaviour=exact&sort_by=DESC&pageNumber=' + \
              page_no + '&action=more_post_ajax'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    text = response.text
    data = BeautifulSoup(text, 'html.parser')

    content_section = data.findAll('article', class_='c-post')
    all_contents = []
    for content_item in content_section:
        content_title = content_item.find('a')['title']

        # handle img
        content_img_div = content_item.find(
            'div', class_='post-image')['style']
        content_img = content_img_div.split("('", 1)[1].split("')")[0]

        # handle date
        content_date = content_item.find('div', class_='author-date-meta').text
        # remove special character from content_date string
        content_date = content_date.replace('\n', '')
        content_date = content_date.replace('\t', '')
        content_date = content_date.replace('\r', '')
        content_date = content_date.replace('|', '')
        content_date = content_date.strip()

        # handle goals
        content_goals = []
        content_goal_element = []
        is_single_goal = False
        # if single goal the div class is 'post-tag' else 'c-sdg-accordion'
        content_goal_element = content_item.find(
            'div', class_='c-sdg-accordion')
        if not content_goal_element:
            is_single_goal = True
            content_goal_element = content_item.find("div", class_='post-tag')

        if not is_single_goal:
            children = content_goal_element.findChildren(
                "div", recursive=False)
        # if children is empty, check span
        if is_single_goal:
            children = content_goal_element.findChildren(
                "span", recursive=False)

        for child in children:
            child_class = child['class']
            # check if child_class has 'sdg-${sdgId}'
            if child_class[1].startswith('sdg-'):
                content_goals.append(child_class[1].split('-')[1])

        content_link = content_item.find('a')['href']
        events = {
            'title': content_title,
            'img': content_img,
            'date': content_date,
            'link': content_link,
            'goals': content_goals
        }
        all_contents.append(events)
    return all_contents


events = []
for x in range(3):
    events += get_events_and_news_by_page_number('events', str(x))
file = open('events.json', 'w')
file.write(json.dumps(events))
file.close()

news = []
for x in range(3):
    news += get_events_and_news_by_page_number('news', str(x))
file = open('news.json', 'w')
file.write(json.dumps(news))
file.close()
