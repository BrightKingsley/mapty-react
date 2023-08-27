import { useState } from "react";
import { SidebarProps } from "../types";
import { Cycling, Running, Workout } from "../../models/Workout";
import { useMap } from "react-leaflet";

/**
 * 
 * @param param0 
 * @returns 
 * {
    cadence: 0,
    coords: [0, 0],
    date: 0,
    descripiton: "",
    distance: 0,
    duration: 0,
    id: "",
    pace: 0,
    type: "running",
  }
 */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Sidebar({
  coords,
  showForm,
  setWorkouts,
  setShowForm,
  workouts,
}: SidebarProps) {
  const [type, setType] = useState<"running" | "cycling">("running");

  const [distance, setDistance] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [gain, setGain] = useState<number>();
  const [speed, setSpeed] = useState<number>();

  const createNewWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(coords,distance);

    if (!coords || distance || duration || gain || speed) return;

    setWorkouts((prev) => [
      ...prev,
      {
        id: (Date.now() + "").slice(-10),
        description: `${type[0].toUpperCase()}${type.slice(1)} on ${
          months[new Date().getMonth()]
        } ${new Date().getDate()}`,
        date: new Date(),
        coords,
        distance,
        duration,
        [type === "running" ? "cadence" : "elevationGain"]: gain,
        [type === "running" ? "pace" : "speed"]: speed,
        type,
      },
    ]);
    console.log(coords)
    setShowForm(false);
  };

  return (
    <div className="sidebar">
      <img src="/assets/logo.png" alt="Logo" className="logo" />

      <ul className="workouts">
        <form
          onSubmit={createNewWorkout}
          className={`form ${showForm ? "" : "hidden"}`}
        >
          <div className="form__row">
            <label className="form__label">Type</label>
            <select
              value={type}
              required
              onChange={(e) => {
                const value = e.target.value;
                if (!value || (value !== "running" && value !== "cycling"))
                  return;
                setType(value);
              }}
              className="form__input form__input--type"
            >
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <div className="form__row">
            <label className="form__label">Distance</label>
            <input
              required
              onChange={(e) => {
                const value = +e.target.value;
                if (!value || value! > 0) return;
                setDistance(value);
              }}
              type="number"
              className="form__input form__input--distance"
              placeholder="km"
            />
          </div>
          <div className="form__row">
            <label className="form__label">Duration</label>
            <input
              required
              onChange={(e) => {
                const value = +e.target.value;
                if (!value || value! > 0) return;
                setDuration(value);
              }}
              className="form__input form__input--duration"
              placeholder="min"
            />
          </div>

          {type === "running" ? (
            <div className="form__row">
              <label className="form__label">Cadence</label>
              <input
                required
                onChange={(e) => {
                  const value = +e.target.value;
                  if (!value || value! > 0) return;
                  setGain(value);
                }}
                className="form__input form__input--cadence"
                placeholder="step/min"
              />
            </div>
          ) : (
            <div className="form__row">
              <label className="form__label">Elev Gain</label>
              <input
                required
                onChange={(e) => {
                  const value = +e.target.value;
                  if (!value || value! > 0) return;
                  setGain(value);
                }}
                className="form__input form__input--elevation"
                placeholder="meters"
              />
            </div>
          )}
          <button className="form__btn">OK</button>
        </form>

        {workouts.map((workout) =>
          workout.type === "running" ? (
            <li
              key={workout.id}
              className="workout workout--running"
              data-id="1234567890"
            >
              <h2 className="workout__title">Running on April 14</h2>
              <div className="workout__details">
                <span className="workout__icon">🏃‍♂️</span>
                <span className="workout__value">5.2</span>
                <span className="workout__unit">km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⏱</span>
                <span className="workout__value">24</span>
                <span className="workout__unit">min</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⚡️</span>
                <span className="workout__value">4.6</span>
                <span className="workout__unit">min/km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">🦶🏼</span>
                <span className="workout__value">178</span>
                <span className="workout__unit">spm</span>
              </div>
            </li>
          ) : (
            <li
              key={workout.id}
              className="workout workout--cycling"
              data-id="1234567891"
            >
              <h2 className="workout__title">Cycling on April 5</h2>
              <div className="workout__details">
                <span className="workout__icon">🚴‍♀️</span>
                <span className="workout__value">27</span>
                <span className="workout__unit">km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⏱</span>
                <span className="workout__value">95</span>
                <span className="workout__unit">min</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⚡️</span>
                <span className="workout__value">16</span>
                <span className="workout__unit">km/h</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⛰</span>
                <span className="workout__value">223</span>
                <span className="workout__unit">m</span>
              </div>
            </li>
          )
        )}
      </ul>

      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
}
