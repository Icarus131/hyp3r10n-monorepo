from collections import Counter
from catboost import CatBoostClassifier
import pandas as pd

# Load the CatBoost model from the .cbm file
model = CatBoostClassifier()
# Replace 'your_model.cbm' with the path to your .cbm file
model.load_model('gradient_boost_model.cbm')
data = pd.read_csv("output.csv")
prediction_counter = Counter()
accuracy_counter = Counter()
res_map = {
    0: "Benign",
    1: "Infilteration"
}
for index, row in data.iterrows():

    new_data = {
        'protocol': row['protocol'],
        'flow_duration': row['flow_duration'],
        'tot_fwd_pkts': row['tot_fwd_pkts'],
        'tot_bwd_pkts': row['tot_bwd_pkts'],
        'totlen_fwd_pkts': row['totlen_fwd_pkts'],
        'totlen_bwd_pkts': row['totlen_bwd_pkts'],
        'fwd_pkt_len_mean': row['fwd_pkt_len_mean'],
        'fwd_pkt_len_std': row['fwd_pkt_len_std'],
        'bwd_pkt_len_mean': row['bwd_pkt_len_mean'],
        'flow_byts_s': row['flow_byts_s'],
        'flow_pkts_s': row['flow_pkts_s'],
        'flow_iat_std': row['flow_iat_std'],
        'flow_iat_min': row['flow_iat_min'],
        'fwd_iat_tot': row['fwd_iat_tot'],
        'fwd_iat_min': row['fwd_iat_min'],
        'bwd_iat_tot': row['bwd_iat_tot'],
        'bwd_iat_min': row['bwd_iat_min'],
        'fwd_psh_flags': row['fwd_psh_flags'],
        'fwd_urg_flags': row['fwd_urg_flags'],
        'bwd_pkts_s': row['bwd_pkts_s'],
        'fin_flag_cnt': row['fin_flag_cnt'],
        'rst_flag_cnt': row['rst_flag_cnt'],
        'psh_flag_cnt': row['psh_flag_cnt'],
        'ack_flag_cnt': row['ack_flag_cnt'],
        'urg_flag_cnt': row['urg_flag_cnt'],
        'down_up_ratio': row['down_up_ratio'],
        'init_fwd_win_byts': row['init_fwd_win_byts'],
        'init_bwd_win_byts': row['init_bwd_win_byts'],
        'fwd_seg_size_min': row['fwd_seg_size_min'],
        'active_mean': row['active_mean'],
        'idle_mean': row['idle_mean']
    }
    new_data = pd.DataFrame([new_data])
    # Use the model to make predictions
    prediction = model.predict(new_data)

    prediction_counter[prediction[0]] += 1
    accuracy_counter[row['label']] += 1
    print(index)
    print("Prediction Counter:", prediction_counter)
    print("Accuracy Counter:", accuracy_counter)

# 0 Benign
# 1 Infilteration
# 2 