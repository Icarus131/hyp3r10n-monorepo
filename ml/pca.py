import pandas as pd
import torch
import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

types = {
    # 'dst_port': 'uint32',
    # 'protocol': 'uint8',
    # 'timestamp': 'object',
    'flow_duration': 'int64',
    'tot_fwd_pkts': 'uint32',
    'tot_bwd_pkts': 'uint32',
    'totlen_fwd_pkts': 'uint32',
    'totlen_bwd_pkts': 'uint32',
    'fwd_pkt_len_max': 'uint16',
    'fwd_pkt_len_min': 'uint16',
    'fwd_pkt_len_mean': 'float32',
    'fwd_pkt_len_std': 'float32',
    'bwd_pkt_len_max': 'uint16',
    'bwd_pkt_len_min': 'uint16',
    'bwd_pkt_len_mean': 'float32',
    'bwd_pkt_len_std': 'float32',
    # 'flow_byts_s': 'float64',
    # 'flow_pkts_s': 'float64',
    'flow_iat_mean': 'float32',
    'flow_iat_std': 'float32',
    'flow_iat_max': 'int64',
    'flow_iat_min': 'int64',
    'fwd_iat_tot': 'int64',
    'fwd_iat_mean': 'float32',
    'fwd_iat_std': 'float32',
    'fwd_iat_max': 'int64',
    'fwd_iat_min': 'int64',
    'bwd_iat_tot': 'uint32',
    'bwd_iat_mean': 'float32',
    'bwd_iat_std': 'float32',
    'bwd_iat_max': 'uint32',
    'bwd_iat_min': 'uint32',
    'fwd_psh_flags': 'uint8',
    'bwd_psh_flags': 'uint8',
    'fwd_urg_flags': 'uint8',
    'bwd_urg_flags': 'uint8',
    'fwd_header_len': 'uint32',
    'bwd_header_len': 'uint32',
    'fwd_pkts_s': 'float32',
    'bwd_pkts_s': 'float32',
    'pkt_len_min': 'uint16',
    'pkt_len_max': 'uint16',
    'pkt_len_mean': 'float32',
    'pkt_len_std': 'float32',
    'pkt_len_var': 'float32',
    'fin_flag_cnt': 'uint8',
    'syn_flag_cnt': 'uint8',
    'rst_flag_cnt': 'uint8',
    'psh_flag_cnt': 'uint8',
    'ack_flag_cnt': 'uint8',
    'urg_flag_cnt': 'uint8',
    'cwe_flag_count': 'uint8',
    'ece_flag_cnt': 'uint8',
    'down_up_ratio': 'uint16',
    'pkt_size_avg': 'float32',
    'fwd_seg_size_avg': 'float32',
    'bwd_seg_size_avg': 'float32',
    'fwd_byts_b_avg': 'uint8',
    'fwd_pkts_b_avg': 'uint8',
    'fwd_blk_rate_avg': 'uint8',
    'bwd_byts_b_avg': 'uint8',
    'bwd_pkts_b_avg': 'uint8',
    'bwd_blk_rate_avg': 'uint8',
    'subflow_fwd_pkts': 'uint32',
    'subflow_fwd_byts': 'uint32',
    'subflow_bwd_pkts': 'uint32',
    'subflow_bwd_byts': 'uint32',
    'init_fwd_win_byts': 'int32',
    'init_bwd_win_byts': 'int32',
    'fwd_act_data_pkts': 'uint32',
    'fwd_seg_size_min': 'uint8',
    'active_mean': 'float32',
    'active_std': 'float32',
    'active_max': 'uint32',
    'active_min': 'uint32',
    'idle_mean': 'float32',
    'idle_std': 'float32',
    'idle_max': 'uint64',
    'idle_min': 'uint64',
    # 'label': 'category'
}

data = pd.read_csv("infiltration_28-02-2018.csv")
columns_to_drop = ['dst_port', 'protocol', 'timestamp', 'label', 'flow_byts_s', 'flow_pkts_s']
data = data.drop(columns_to_drop, axis=1, inplace=False)

# Cast remaining columns to specified data types
data = data.astype(types)

# Standardize the data
# Find columns with infinite or too large values
# problematic_cols = data.columns[data.abs().max() == np.inf].tolist()
# if problematic_cols:
#     print(f"Columns with infinite values: {problematic_cols}")
# else:
#     print("No columns with infinite values found.")

# # Find columns with values too large for float64
# large_value_cols = data.columns[(data.abs() > np.finfo(np.float64).max).any()].tolist()
# if large_value_cols:
#     print(f"Columns with values too large for float64: {large_value_cols}")
# else:
#     print("No columns with values too large for float64 found.")


# attributes_to_float64 = ['flow_byts_s', 'flow_pkts_s', 'flow_iat_mean', 'flow_iat_std', 'flow_iat_max', 'flow_iat_min', 
#                          'fwd_iat_mean', 'fwd_iat_std', 'fwd_iat_max', 'fwd_iat_min', 'bwd_iat_tot', 'bwd_iat_mean', 
#                          'bwd_iat_std', 'bwd_iat_max', 'bwd_iat_min', 'fwd_pkts_s', 'bwd_pkts_s', 'pkt_len_var', 
#                          'pkt_size_avg', 'active_mean', 'active_std', 'active_max', 'active_min', 'idle_mean', 
#                          'idle_std', 'idle_max', 'idle_min']

# # Cast the specified attributes to float64 after scaling
# for attr in attributes_to_float64:
#     data[attr] = data[attr].astype('float64')
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# Perform PCA
pca = PCA()
pca.fit(data_scaled)

# Get the explained variance ratio
explained_variance_ratio = pca.explained_variance_ratio_

# Print the contribution of each attribute to the principal components
for i, ratio in enumerate(explained_variance_ratio):
    print(f"Principal Component {i+1}: {ratio*100:.2f}%")


components = pca.components_

# Create a DataFrame to store the top contributing attributes for each component
component_df = pd.DataFrame(components, columns=data.columns)

# Print the top contributing attributes for each principal component
for i in range(len(components)):
    print(f"Principal Component {i+1} Top Attributes:")
    top_attributes = component_df.iloc[i].abs().sort_values(ascending=False).head(10)
    print(top_attributes)
    print()