import config as cfg
import pyTigerGraph as Tg


def connect_tg():

    if not cfg.TG_TOKEN:
        cfg.TG_TOKEN = Tg.TigerGraphConnection(host=cfg.TG_HOSTNAME, graphname=cfg.TG_GRAPH_NAME).getToken(cfg.TG_SECRET)[0]

    conn = Tg.TigerGraphConnection(host=cfg.TG_HOSTNAME, username=cfg.TG_USERNAME, password=cfg.TG_PASSWORD,
                                   graphname=cfg.TG_GRAPH_NAME, apiToken=cfg.TG_TOKEN)

    return conn
