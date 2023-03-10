import {useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../components/Layout/layoutAdmin";

import Swal from "sweetalert2";

export const TambahBagianSrAdmin = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [children, setChildren] = useState({
    parent_id: params.induk_id,
    rental_retribution: "",
    utilization_engagement_type: "",
    utilization_engagement_name: "",
    allotment_of_use: "",
    coordinate: "",
    large: "",
    validity_period_of: "",
    validity_period_until: "",
    engagement_number: "",
    engagement_date: "",
    description: "",
    application_letter: null,
    agreement_letter: null,
  });

  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem("token");
      const formData = new FormData();

      for (const key in children) {
        formData.append(key, children[key]);
      }
      formData.append("token", token);

      let res = await fetch(apiUrl + "childer/create", {
        method: "POST",
        body: formData,
      });

      let resJson = await res.json();

      if (res.status != 201) {
        let message = resJson.message;
        if (!Array.isArray(message)) message = [resJson.message];

        let messageList = "";
        message.forEach((item) => {
          messageList += "<li>" + item + "</li>";
        });

        return Swal.fire({
          icon: "error",
          title: "Oops...",
          html: messageList,
          // text: messageList,
          // timer: 1000,
        });

        // return setMessage(message);
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: resJson.message,
        timer: 1000,
      });

      return navigate("/upt/" + params.id + "/admin/detail/" + params.induk_id);
    } catch (error) {
      console.log(error);
    }
  };

    const [file, setFile] = useState();
    const uploadRef = useRef();
    const statusRef = useRef();
    const loadTotalRef = useRef();
    const progressRef = useRef();

    const UploadFile = () => {
        const file = uploadRef.current.files[0];
        setFile(URL.createObjectURL(file));
        var formData = new FormData();
        formData.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", ProgressHandler, false);
        xhr.addEventListener("load", SuccessHandler, false);
        xhr.addEventListener("error", ErrorHandler, false);
        xhr.addEventListener("abort", AbortHandler, false);
        xhr.open("POST", apiUrl + "tumbalGambar");
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        xhr.send(formData);
    };

    const ProgressHandler = (e) => {
        loadTotalRef.current.innerHTML = `${uploadRef.current.files[0].name} uploaded ${Math.round(e.loaded/1024)}K bytes of ${Math.round(e.total/1024)}K    bytes`;
        var percent = (e.loaded / e.total) * 100;
        progressRef.current.value = Math.round(percent);
        // statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
    };

    const SuccessHandler = (e) => {
        // statusRef.current.innerHTML = e.target.responseText;
        progressRef.current.value = 100;
    };

    const ErrorHandler = () => {
        // statusRef.current.innerHTML = "upload failed!!";
    };
    const AbortHandler = () => {
        // statusRef.current.innerHTML = "upload aborted!!";
    };

    /* 2222 */
    const [file2, setFile2] = useState();
    const uploadRef2 = useRef();
    const statusRef2 = useRef();
    const loadTotalRef2 = useRef();
    const progressRef2 = useRef();

    const UploadFile2 = () => {
        const file2 = uploadRef2.current.files[0];
        setFile2(URL.createObjectURL(file2));
        var formData = new FormData();
        formData.append("image", file2);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", ProgressHandler2, false);
        xhr.addEventListener("load", SuccessHandler2, false);
        xhr.addEventListener("error", ErrorHandler2, false);
        xhr.addEventListener("abort", AbortHandler2, false);
        xhr.open("POST", apiUrl + "tumbalGambar");
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        xhr.send(formData);
    };

    const ProgressHandler2 = (e) => {
        loadTotalRef2.current.innerHTML = `${uploadRef2.current.files[0].name} uploaded ${e.loaded} bytes of ${e.total} bytes`;
        var percent = (e.loaded / e.total) * 100;
        progressRef2.current.value = Math.round(percent);
        // statusRef2.placeholder = Math.round(percent) + "% uploaded...";
    };

    const SuccessHandler2 = (e) => {
        // statusRef2.current.innerHTML = e.target.responseText;
        progressRef2.current.value = 100;
    };

    const ErrorHandler2 = () => {
        // statusRef2.current.innerHTML = "upload failed!!";
    };
    const AbortHandler2 = () => {
        // statusRef2.current.innerHTML = "upload aborted!!";
    };

  return (
    <LayoutAdmin>
      <div
        className="d-flex justify-content-between align-items-center mx-3 py-3"
        style={{
          borderBottom: "#BCBCBC 1px solid",
        }}
      >
        <div
          className="font-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr; &emsp; Kembali
        </div>
        <div className="d-flex gap-2">
          <div
            className="text-center"
            style={{
              cursor: "pointer",
              border: "#DC2F2F 1px solid",
              padding: "5px 10px",
              borderRadius: "5px",
              color: "#DC2F2F",
              width: "120px",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Batal
          </div>
          <button onClick={handleSubmit} className="primary-btn">
            Tambah Data
          </button>
        </div>
      </div>
      <div className="mx-5">
        <h5 style={{ paddingBottom: "20px", paddingTop: "10px" }}>
          Edit Tanah Bagian
        </h5>

        {/* <div className="error-text-container w-100">
          {message.map((item, key) => {
            return (
              <div className="text-danger" key={key}>
                {item}
              </div>
            );
          })}
        </div> */}

        <form className="d-flex form-tambah-tanah gap-5">
          <div className="left-form d-flex flex-col gap-3">
            <div>
              <label htmlFor="sertifikat-jenispemanfaatan">
                Penggunaan/Pemanfaatan
              </label>
              <select
                className="form-select"
                value={children.utilization_engagement_type}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    utilization_engagement_type: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  -- Pilih --
                </option>
                <option value="sewa_sip_bmd">Sewa/SIP BMD</option>
                <option value="retribusi">Retribusi</option>
              </select>
            </div>
            <div>
              <label htmlFor="berlaku-dari">Atas Nama</label>
              <input
                type="text"
                className="w-100"
                name="atas-nama"
                value={children.utilization_engagement_name}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    utilization_engagement_name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="nilai-sewa">
                Nilai Sewa/Retribusi (Rp/Tahun)
              </label>
              <input
                type="text"
                className="w-100"
                name="nilai-sewa"
                value={children.rental_retribution}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    rental_retribution: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="peruntukan-pemanfaatan">
                Peruntukan Pemanfaatan
              </label>
              <input
                type="text"
                className="w-100"
                name="peruntukan-pemanfaatan"
                value={children.allotment_of_use}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    allotment_of_use: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="koordinat">Koordinat (LS BT)</label>
              <input
                type="text"
                className="w-100"
                name="koordinat"
                value={children.coordinate}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    coordinate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="luas-bagian">Luas Bagian  (m??)</label>
              <input
                type="text"
                className="w-100"
                name="luas-bagian"
                value={children.large}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    large: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <h5
                className="font-semibold"
                style={{
                  fontSize: "16px",
                  margin: "0 0 5px 0",
                }}
              >
                Masa Berlaku
              </h5>
              <label htmlFor="atas-nama">Dari</label>
              <input
                type="date"
                className="w-100"
                name="berlaku-dari"
                value={children.validity_period_of}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    validity_period_of: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="atas-nama">Sampai</label>
              <input
                type="date"
                className="w-100"
                name="berlaku-dari"
                value={children.validity_period_until}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    validity_period_until: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="right-form d-flex flex-col gap-3">
            <div>
              <label htmlFor="nomor-perikatan">Nomor Perikatan</label>
              <input
                type="text"
                className="w-100"
                name="nomor-perikatan"
                value={children.engagement_number}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    engagement_number: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="tanggal-perikatan">Tanggal Perikatan</label>
              <input
                type="date"
                className="w-100"
                name="tanggal-perikatan"
                value={children.engagement_date}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    engagement_date: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="keterangan">Keterangan</label>
              <textarea
                name="keterangan"
                className="w-100"
                value={children.description}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="d-flex flex-col">
              <label className="font-semibold">Surat Perjanjian</label>
              <label
                htmlFor="surat-perjanjian"
                className="font-semibold file-input d-flex flex-col justify-content-center align-items-center"
              >
                <p className="p-0 m-0">
                  Drag & drop files or{" "}
                  <span style={{ color: "#483EA8" }}>Browse</span>
                </p>
                <p className="secondary-text">
                  Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </label>
              <input
                type="file"
                className="d-none"
                id="surat-perjanjian"
                ref={uploadRef}
                onChange={(e) =>
                {
                    setChildren({
                        ...children,
                        agreement_letter: e.target.files[0],
                    });
                    UploadFile()
                }
                }
              />
                <progress style={{width : '100%'}} ref={progressRef} max={100}></progress>
                <p ref={loadTotalRef}></p>
            </div>
            <div className="d-flex flex-col">
              <label className="font-semibold">Surat Permohonan</label>
              <label
                htmlFor="surat-permohonan"
                className="font-semibold file-input d-flex flex-col justify-content-center align-items-center"
              >
                <p className="p-0 m-0">
                  Drag & drop files or{" "}
                  <span style={{ color: "#483EA8" }}>Browse</span>
                </p>
                <p className="secondary-text">
                  Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </label>
              <input
                type="file"
                className="d-none"
                ref={uploadRef2}
                id="surat-permohonan"
                onChange={(e) =>
                {
                    setChildren({
                        ...children,
                        application_letter: e.target.files[0],
                    })
                    UploadFile2();
                }
                }
              />
                <progress style={{width: '100%'}} ref={progressRef2} max={100} ></progress>
                <p ref={loadTotalRef2}></p>
            </div>
          </div>
        </form>
      </div>
    </LayoutAdmin>
  );
};
