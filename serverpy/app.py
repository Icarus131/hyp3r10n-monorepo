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

@app.post("/predict")
async def predict(new_data_dict: NewDataInput):
    res_map = {0: "Benign", 1: "Infiltration"}
    model = CatBoostClassifier()
    model.load_model("gradient_boost_model.cbm")
    new_data_df = pd.DataFrame([new_data_dict.dict()])

    prediction = model.predict(new_data_df)

    result = {"Result": res_map[prediction[0]]}

    return result

# uvicorn app:app --host 0.0.0.0 --port 8080