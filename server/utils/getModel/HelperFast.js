const axios = require("axios");

const testFastReq = async (req, res) => {
  try {
    console.log("got in Fast");
    const response = await axios.get("http://localhost:8080/");
    console.log("res from fastapi-->", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

const sum = async (req, res) => {
  try {
    const { x, y } = req.query;
    if (!x || !y) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const response = await axios.get(`http://localhost:8080/sum?x=${x}&y=${y}`);
    console.log("res from fastapi-->", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

const predict = async (req, res) => {
  try {
    const data = {
      protocol: 0,
      flow_duration: 115307855,
      tot_fwd_pkts: 5,
      tot_bwd_pkts: 0,
      totlen_fwd_pkts: 0.0,
      totlen_bwd_pkts: 0.0,
      fwd_pkt_len_mean: 0.0,
      fwd_pkt_len_std: 0.0,
      bwd_pkt_len_mean: 0.0,
      flow_byts_s: 0.04336218,
      flow_pkts_s: 32400000.0,
      flow_iat_std: 812396.0,
      flow_iat_min: 115000000.0,
      fwd_iat_tot: 812396.0,
      fwd_iat_min: 0.0,
      bwd_iat_tot: 0.0,
      bwd_iat_min: 0.0,
      fwd_psh_flags: 0,
      fwd_urg_flags: 0,
      bwd_pkts_s: 0.0,
      fin_flag_cnt: 0,
      rst_flag_cnt: 0,
      psh_flag_cnt: 0,
      ack_flag_cnt: 0,
      urg_flag_cnt: 0,
      down_up_ratio: -1.0,
      init_fwd_win_byts: -1,
      init_bwd_win_byts: 0,
      fwd_seg_size_min: 1812348,
      active_mean: 56700000.0,
      idle_mean: 56700000.0,
    };

    const response = await axios.post("http://localhost:8080/predict", data);
    console.log("Response:", response.data);
    res.status(200).json({ Result: response.data });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

module.exports = { testFastReq, sum, predict };
