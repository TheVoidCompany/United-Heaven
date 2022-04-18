from db.init_db import connect_tg


def create_action():
    conn = connect_tg()


def user_liked_action(user_id, action_id):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_LIKES_ACTION", "Action", action_id)
    return result


def user_unliked_action(user_id, action_id):
    conn = connect_tg()
    result = conn.delEdges("User", user_id, "USER_LIKES_ACTION", "Action", action_id)
    return result


def user_participates_action(user_id, action_id):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_PARTICIPATES_ACTION", "Action", action_id)
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


def update_action_by_id():
    conn = connect_tg()
    return
