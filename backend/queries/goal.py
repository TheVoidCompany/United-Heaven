from db.init_db import connect_tg


# user follow goal
def user_follow_goal(user_id, goal_id, follow_date):
    conn = connect_tg()

    result = conn.upsertEdge("User", user_id, "USER_FOLLOWS_GOAL", "Goal", goal_id, {"followDate": follow_date})
    return result


# user unfollow goal
def user_unfollow_goal(user_id, goal_id):
    conn = connect_tg()

    result = conn.delEdges("User", user_id, "USER_FOLLOWS_GOAL", "Goal", goal_id)
    return result

