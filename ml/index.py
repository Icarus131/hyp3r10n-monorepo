from collections import Counter
from catboost import CatBoostClassifier
import pandas as pd

# Load the CatBoost model from the .cbm file
model = CatBoostClassifier()
# Replace 'your_model.cbm' with the path to your .cbm file
model.load_model('gradient_boost_model.cbm')
data = pd.read_csv("infiltration_reduced1.csv")
prediction_counter = Counter()
accuracy_counter = Counter()
res_map = {
    0: "Benign",
    1: "Infilteration"
}
for index, row in data.iterrows():
    # Filter out the required attributes from the row
    # if(index == 10000):

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

    # Check if the prediction matches the actual label
    # Calculate accuracy for each label


# print("Actual Counter", actual_counter)

# Get model parameters
# parameters = model.get_params()
# print("Model Parameters:", parameters)

# Get tree structures (if applicable)
# if model.is_fitted():
#     tree_structures = model.plot_tree(tree_idx=1)
#     print("Tree Structures:", tree_structures)

# Get feature importance
# feature_importance = model.get_feature_importance()
# print("Feature Importance:", feature_importance)

# Get model configuration
# config = model.get_model_config()

# print("Model Configuration:", config)

# Get metadata
# metadata = model.get_metadata()
# print("Metadata:", dict(metadata))

# Get other model-specific information
# For example, you can access per-iteration validation metrics using model.get_best_score()
# best_scores = model.get_best_score()
# print("Best Validation Scores:", best_scores)
# # Example new data (replace with your actual data)
# new_data_pls_work = {
#     'protocol': '0',
#     'flow_duration': '115307855',
#     'tot_fwd_pkts': '5',
#     'tot_bwd_pkts': '0',
#     'totlen_fwd_pkts': '0',
#     'totlen_bwd_pkts': '0',
#     'fwd_pkt_len_mean': '0',
#     'fwd_pkt_len_std': '0',
#     'bwd_pkt_len_mean': '0',
#     'flow_byts_s': '0',
#     'flow_pkts_s': '0',
#     'flow_iat_std': '0.04336218',
#     'flow_iat_min': '32400000',
#     'fwd_iat_tot': '812396',
#     'fwd_iat_min': '115000000',
#     'bwd_iat_tot': '812396',
#     'bwd_iat_min': '0',
#     'fwd_psh_flags': '0',
#     'fwd_urg_flags': '0',
#     'bwd_pkts_s': '0',
#     'fin_flag_cnt': '0',
#     'rst_flag_cnt': '0',
#     'psh_flag_cnt': '0',
#     'ack_flag_cnt': '0',
#     'urg_flag_cnt': '0',
#     'down_up_ratio': '0',
#     'init_fwd_win_byts': '-1',
#     'init_bwd_win_byts': '-1',
#     'fwd_seg_size_min': '0',
#     'active_mean': '1812348',
#     'idle_mean': '56700000'
# }

# new_data_pls_work = {
#     'protocol': '6',
#     'flow_duration': '1665774',
#     'tot_fwd_pkts': '8',
#     'tot_bwd_pkts': '7',
#     'totlen_fwd_pkts': '1128',
#     'totlen_bwd_pkts': '1581',
#     'fwd_pkt_len_mean': '141',
#     'fwd_pkt_len_std': '222.6233206',
#     'bwd_pkt_len_mean': '225.8571429',
#     'flow_byts_s': '1626.271031',
#     'flow_pkts_s': '9.004822983',
#     'flow_iat_std': '245645.075',
#     'flow_iat_min': '3',
#     'fwd_iat_tot': '1665774',
#     'fwd_iat_min': '3',
#     'bwd_iat_tot': '1557359',
#     'bwd_iat_min': '108741',
#     'fwd_psh_flags': '0',
#     'fwd_urg_flags': '0',
#     'bwd_pkts_s': '4.202250725',
#     'fin_flag_cnt': '0',
#     'rst_flag_cnt': '1',
#     'psh_flag_cnt': '1',
#     'ack_flag_cnt': '0',
#     'urg_flag_cnt': '0',
#     'down_up_ratio': '0',
#     'init_fwd_win_byts': '0',
#     'init_bwd_win_byts': '0',
#     'fwd_seg_size_min': '8192',
#     'active_mean': '62872',
#     'idle_mean': '20'
# }

# new_data  = {
#     'protocol': 17,
#     'flow_duration':11186,
#     'tot_fwd_pkts': 1,
#     'tot_bwd_pkts': 1,
#     'totlen_fwd_pkts': 41,
#     'totlen_bwd_pkts': 97,
#     'fwd_pkt_len_mean': 41,
#     'fwd_pkt_len_std': 0,
#     'bwd_pkt_len_mean': 97,
#     'flow_byts_s': 12336.84963,
#     'flow_pkts_s': 178.7949222,
#     'flow_iat_std': 0,
#     'flow_iat_min': 11186,
#     'fwd_iat_tot': 0,
#     'fwd_iat_min': 0,
#     'bwd_iat_tot': 0,
#     'bwd_iat_min': 0,
#     'fwd_psh_flags': 0,
#     'fwd_urg_flags': 0,
#     'bwd_pkts_s': 89.39746111,
#     'fin_flag_cnt': 0,
#     'rst_flag_cnt': 0,
#     'psh_flag_cnt': 0,
#     'ack_flag_cnt': 0,
#     'urg_flag_cnt': 0,
#     'down_up_ratio': 1,
#     'init_fwd_win_byts': -1,
#     'init_bwd_win_byts': -1,
#     'fwd_seg_size_min': 8,
#     'active_mean': 0,
#     'idle_mean': 0
# }
# # # Convert the new data to a DataFrame
# new_df = pd.DataFrame([new_data])

# # # Make predictions using the loaded model
# predictions = model.predict(new_df)

# # # Print the predictions
# print(predictions)
