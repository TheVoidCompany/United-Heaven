from db.init_db import connect_tg
import datetime


def create_action(action_id, title, description, goals, targets, start_date, end_date, is_online, location,
                  online_action_url, creator, current_date):
    conn = connect_tg()
    result = conn.upsertVertex("Action",
                               action_id,
                               {
                                   "title": title,
                                   "description": description,
                                   "goals": goals,
                                   "targets": targets,
                                   "startDate": start_date,
                                   "endDate": end_date,
                                   "isOnline": is_online,
                                   "location": location,
                                   "onlineActionUrl": online_action_url,
                                   "creator": creator,
                                   "creationDate": current_date
                               }
                               )
    return result


def update_action(action_id, title, description, goals, targets, start_date, end_date, is_online, location,
                  online_action_url, image_url, creator, creation_date):
    conn = connect_tg()
    result = conn.upsertVertex("Action",
                               action_id,
                               {
                                   "title": title,
                                   "description": description,
                                   "goals": goals,
                                   "targets": targets,
                                   "startDate": start_date,
                                   "endDate": end_date,
                                   "isOnline": is_online,
                                   "location": location,
                                   "onlineActionUrl": online_action_url,
                                   "imageUrl": image_url,
                                   "creator": creator,
                                   "creationDate": creation_date
                               }
                               )
    return result


def user_creates_action(user_id, action_id, creation_date):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_CREATES_ACTION", "Action", action_id, {
        "creationDate": creation_date
    })


def action_in_year(action_id, year):
    conn = connect_tg()
    result = conn.upsertEdge("Action", action_id, "ACTION_IN_YEAR", "Year", year)
    return result


def user_liked_action(user_id, action_id, liked_date):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_LIKES_ACTION", "Action", action_id, {
        "likedDate": liked_date
    })
    return result


def action_in_country(action_id, country):
    conn = connect_tg()
    result = conn.upsertEdge("Action", action_id, "ACTION_HAS_COUNTRY", "Country", country)
    return result



def user_unliked_action(user_id, action_id):
    conn = connect_tg()
    result = conn.delEdges("User", user_id, "USER_LIKES_ACTION", "Action", action_id)
    return result


def user_participates_action(user_id, action_id, participation_date):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_PARTICIPATES_ACTION", "Action", action_id, {
        "participationDate": participation_date
    })
    return result


def user_unparticipates_action(user_id, action_id):
    conn = connect_tg()
    result = conn.delEdges("User", user_id, "USER_PARTICIPATES_ACTION", "Action", action_id)
    return result


def delete_action_by_id(action_id):
    conn = connect_tg()
    result = conn.delVerticesById("Action", action_id)
    return result


def get_action_by_id(action_id):
    conn = connect_tg()
    result = conn.getVerticesById("Action", action_id)
    return result


def action_has_goals(action_goals):
    conn = connect_tg()
    result = conn.upsertEdges("Action", "ACTION_HAS_GOAL", "Goal", action_goals)
    return result


def action_has_targets(action_targets):
    conn = connect_tg()
    result = conn.upsertEdges("Action", "ACTION_HAS_TARGET", "Target_", action_targets)
    return result
