import pyTigerGraph as Tg
import config as cfg


def connect_tg():
    conn = Tg.TigerGraphConnection(cfg.TG_HOSTNAME, cfg.TG_USERNAME, cfg.TG_PASSWORD,
                                   cfg.TG_GRAPH_NAME)
    conn.apiToken = conn.getToken(conn.createSecret())
    return conn
