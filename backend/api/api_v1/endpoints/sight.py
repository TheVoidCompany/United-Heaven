from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get all country index
@router.get("/index")
async def get_all_country_index():
    conn = connect_tg()
    sdg_data = conn.runInstalledQuery("find_sdg_data_of_countries")
    return sdg_data[0]["result"]
