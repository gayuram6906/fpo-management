import React, { useState } from "react";
import { Leaf, Sparkles } from "lucide-react";
import api from "../services/api";

export default function CropAdvisory() {

    const [form, setForm] = useState({
        crop: "",
        village: "",
        season: "KHARIF",
        landArea: "",
        irrigation: "AVAILABLE"
    });

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {

            setError("");
            setData(null);

            const response = await api.post(
                "/advisory",
                {
                    ...form,
                    landArea: Number(form.landArea)
                }
            );

            setData(response.data);

        } catch (err) {

            console.error(
                "Crop advisory error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to generate crop advisory."
            );
        }
    };

    return (
        <>
            <div className="page-head">

                <div>

          <span className="eyebrow">
            FARMER SUPPORT
          </span>

                    <h2>
                        Crop Advisory
                    </h2>

                    <p>
                        Get crop suitability and
                        market guidance for FPO members.
                    </p>

                </div>

            </div>

            {error && (
                <div className="alert">
                    {error}
                </div>
            )}

            <div className="panel advisory-form-panel">

                <div className="advisory-heading">

                    <div className="advisory-icon">
                        <Leaf size={24} />
                    </div>

                    <div>
                        <h3>
                            Farmer Crop Details
                        </h3>

                        <p>
                            Enter crop and land details
                            to generate advisory.
                        </p>
                    </div>

                </div>

                <form
                    className="form-grid"
                    onSubmit={submit}
                >

                    <label>
                        Crop

                        <select
                            required
                            value={form.crop}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    crop: e.target.value
                                })
                            }
                        >
                            <option value="">
                                Select crop
                            </option>

                            <option value="Tomato">
                                Tomato
                            </option>

                            <option value="Maize">
                                Maize
                            </option>

                            <option value="Groundnut">
                                Groundnut
                            </option>

                            <option value="Paddy">
                                Paddy
                            </option>

                            <option value="Onion">
                                Onion
                            </option>

                        </select>

                    </label>

                    <label>
                        Village

                        <input
                            type="text"
                            required
                            value={form.village}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    village: e.target.value
                                })
                            }
                            placeholder="Example: Pollachi"
                        />

                    </label>

                    <label>
                        Season

                        <select
                            value={form.season}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    season: e.target.value
                                })
                            }
                        >

                            <option value="KHARIF">
                                Kharif
                            </option>

                            <option value="RABI">
                                Rabi
                            </option>

                            <option value="SUMMER">
                                Summer
                            </option>

                        </select>

                    </label>

                    <label>
                        Land Area (Acres)

                        <input
                            type="number"
                            required
                            min="0.1"
                            step="0.1"
                            value={form.landArea}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    landArea: e.target.value
                                })
                            }
                            placeholder="Example: 4"
                        />

                    </label>

                    <label>
                        Irrigation

                        <select
                            value={form.irrigation}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    irrigation: e.target.value
                                })
                            }
                        >

                            <option value="AVAILABLE">
                                Available
                            </option>

                            <option value="LIMITED">
                                Limited
                            </option>

                            <option value="RAINFED">
                                Rainfed
                            </option>

                        </select>

                    </label>

                    <div className="advisory-submit">

                        <button
                            type="submit"
                            className="primary"
                        >
                            <Sparkles size={17} />
                            Generate Advisory
                        </button>

                    </div>

                </form>

            </div>

            {data && (

                <div className="advisory-result">

                    <div className="advisory-result-head">

                        <div>

              <span className="eyebrow">
                CROP RECOMMENDATION
              </span>

                            <h3>
                                {data.crop}
                            </h3>

                            <p>
                                {data.village} •
                                {" "}
                                {data.landArea} acres
                            </p>

                        </div>

                        <div className="advisory-result-icon">
                            🌱
                        </div>

                    </div>

                    <div className="advisory-grid">

                        <div className="advisory-item">

              <span>
                Suitability
              </span>

                            <strong>
                                {data.suitability}
                            </strong>

                        </div>

                        <div className="advisory-item">

              <span>
                Water Requirement
              </span>

                            <strong>
                                {data.waterRequirement}
                            </strong>

                        </div>

                        <div className="advisory-item">

              <span>
                Expected Production
              </span>

                            <strong>
                                {data.expectedProduction}
                            </strong>

                        </div>

                        <div className="advisory-item">

              <span>
                Market Recommendation
              </span>

                            <strong>
                                {data.marketRecommendation}
                            </strong>

                        </div>

                    </div>

                    <div className="advisory-note">

            <span>
              Advisory
            </span>

                        <p>
                            {data.advisory}
                        </p>

                    </div>

                </div>

            )}

        </>
    );
}