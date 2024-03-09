from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from catboost import CatBoostClassifier
import pandas as pd

app = FastAPI()


class NewDataInput(BaseModel):
    protocol: int
    flow_duration: float
    tot_fwd_pkts: int
    tot_bwd_pkts: int
    totlen_fwd_pkts: float
    totlen_bwd_pkts: float
    fwd_pkt_len_mean: float
    fwd_pkt_len_std: float
    bwd_pkt_len_mean: float
    flow_byts_s: float
    flow_pkts_s: float
    flow_iat_std: float
    flow_iat_min: float
    fwd_iat_tot: float
    fwd_iat_min: float
    bwd_iat_tot: float
    bwd_iat_min: float
    fwd_psh_flags: int
    fwd_urg_flags: int
    bwd_pkts_s: float
    fin_flag_cnt: int
    rst_flag_cnt: int
    psh_flag_cnt: int
    ack_flag_cnt: int
    urg_flag_cnt: int
    down_up_ratio: float
    init_fwd_win_byts: int
    init_bwd_win_byts: int
    fwd_seg_size_min: int
    active_mean: float
    idle_mean: float


@app.get("/")
def index():
    return "<h1>Python Server</h1>"


@app.post("/predict")
async def predict():
    res_map = {0: "Benign", 1: "Infiltration"}
    model = CatBoostClassifier()
    model.load_model("gradient_boost_model.cbm")

    new_data_dict = {
        "protocol": 0,
        "flow_duration": 115307855,
        "tot_fwd_pkts": 5,
        "tot_bwd_pkts": 0,
        "totlen_fwd_pkts": 0.0,
        "totlen_bwd_pkts": 0.0,
        "fwd_pkt_len_mean": 0.0,
        "fwd_pkt_len_std": 0.0,
        "bwd_pkt_len_mean": 0.0,
        "flow_byts_s": 0.04336218,
        "flow_pkts_s": 32400000.0,
        "flow_iat_std": 812396.0,
        "flow_iat_min": 115000000.0,
        "fwd_iat_tot": 812396.0,
        "fwd_iat_min": 0.0,
        "bwd_iat_tot": 0.0,
        "bwd_iat_min": 0.0,
        "fwd_psh_flags": 0,
        "fwd_urg_flags": 0,
        "bwd_pkts_s": 0.0,
        "fin_flag_cnt": 0,
        "rst_flag_cnt": 0,
        "psh_flag_cnt": 0,
        "ack_flag_cnt": 0,
        "urg_flag_cnt": 0,
        "down_up_ratio": -1.0,
        "init_fwd_win_byts": -1,
        "init_bwd_win_byts": 0,
        "fwd_seg_size_min": 1812348,
        "active_mean": 56700000.0,
        "idle_mean": 56700000.0,
    }

    new_data_df = pd.DataFrame([new_data_dict])

    prediction = model.predict(new_data_df)

    result = {"prediction": res_map[prediction[0]]}

    return result

# uvicorn app:app --host 0.0.0.0 --port 8080