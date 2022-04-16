from db.init_db import connect_tg
import bcrypt


def create_user(user_id, country, creation_date):
    conn = connect_tg()
    print(user_id, country, creation_date)
    result = conn.upsertVertex("User", user_id, {
        "country": country, "creationDate": creation_date})
    return result


def add_user_info(user_id, name, email, password, lat, lon, timezone, social_links):
    conn = connect_tg()
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    result = conn.upsertVertex("UserInfo",
                               user_id,
                               {"name": name,
                                "emailId": email,
                                "password": hashed_password,
                                "latitude": lat,
                                "longitude": lon,
                                "timezone": timezone
                                # "socialLinks": user.social_links
                                })
    return result


def get_user_by_email(email):
    conn = connect_tg()
    result = conn.runInstalledQuery(
        "find_user_by_email", {"email": email})[0]["result"]
    return result


def delete_user_by_id(user_id):
    conn = connect_tg()
    result = conn.delVerticesById("User", user_id)
    return result
