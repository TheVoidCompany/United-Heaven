from db.init_db import connect_tg


# create a user vertex
def create_user(user_id, country, creation_date):
    conn = connect_tg()

    result = conn.upsertVertex("User", user_id, {
        "country": country, "creationDate": creation_date})
    return result


# create a user_info vertex
def create_user_info(user_id, name, email, password, lat, lon, timezone, social_links):
    conn = connect_tg()
    result = conn.upsertVertex("UserInfo",
                               user_id,
                               {
                                    "name": name,
                                    "email": email,
                                    "password": password,
                                    "latitude": lat,
                                    "longitude": lon,
                                    "timezone": timezone,
                                    "socialLinks": {
                                            "keylist": [
                                                "instagramUrl",
                                                "facebookUrl",
                                                "linkedInUrl"
                                            ],
                                            "valuelist": [
                                                social_links.instagram_url,
                                                social_links.facebook_url,
                                                social_links.linkedIn_url,
                                            ]
                                    }
                                })
    return result


def connect_user_country(user_id, country):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_IN_COUNTRY", "Country", country)
    return result


def connect_user_year(user_id, year):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_IN_YEAR", "Year", year)
    return result


def connect_user_user_info(user_id):
    conn = connect_tg()
    result = conn.upsertEdge("User", user_id, "USER_HAS_INFO", "UserInfo", user_id)
    return result


def get_user_by_email(email):
    conn = connect_tg()
    result = conn.runInstalledQuery(
        "find_user_by_email", {"email": email})[0]["result"]
    return result


def get_user_by_id(user_id):
    conn = connect_tg()
    result = conn.getVerticesById("UserInfo", user_id)
    return result


def update_user_by_id(user_id, name, email, password, image_url, lat, lon, timezone, social_links):
    conn = connect_tg()
    result = conn.upsertVertex("UserInfo",
                               user_id,
                               {
                                    "name": name,
                                    "email": email,
                                    "password": password,
                                    "imageUrl": image_url,
                                    "latitude": lat,
                                    "longitude": lon,
                                    "timezone": timezone,
                                    "socialLinks": {
                                        "keylist": [
                                            "instagramUrl",
                                            "facebookUrl",
                                            "linkedInUrl"
                                        ],
                                        "valuelist": [
                                            social_links["instagramUrl"],
                                            social_links["facebookUrl"],
                                            social_links["linkedInUrl"],
                                        ]
                                    }
                                })
    return result


def delete_user_by_id(user_id):
    conn = connect_tg()
    return conn.delVerticesById("User", user_id)


def delete_user_info_by_id(user_id):
    conn = connect_tg()
    return conn.delVerticesById("UserInfo", user_id)
