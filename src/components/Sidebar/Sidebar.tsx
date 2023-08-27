import { useContext, useEffect, useState } from "react";
import { SidebarProps } from "../types";
import { Cycling, Running, Workout } from "../../models/Workout";
import { useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { BiCaretDownCircle, BiMenu, BiX } from "react-icons/bi";
import { Collapsible } from "react-materialize";
import AppContext from "../../context/appContext";
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

export default function Sidebar({ coords }: SidebarProps) {
  const {
    showForm,
    setShowForm,
    setWorkouts,
    setShowSide,
    setCurrentWorkout,
    showSide,
    workouts,
  } = useContext(AppContext);

  const [type, setType] = useState<"running" | "cycling">("running");

  const [distance, setDistance] = useState<number | string>("");
  const [duration, setDuration] = useState<number | string>("");
  const [gain, setGain] = useState<number | string>("");

  const createNewWorkout = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(coords, distance);

    if (!coords || !distance || !duration || !gain)
      return alert("please input valid data");

    console.log(
      "TYPETHINGS",
      `${type[0].toUpperCase()}${type.slice(1)} on ${
        months[new Date().getMonth()]
      } ${new Date().getDate()}`
    );

    const newWorkout = {
      id: (Date.now() + "").slice(-10),
      descripiton: `${type[0].toUpperCase()}${type.slice(1)} on ${
        months[new Date().getMonth()]
      } ${new Date().getDate()}`,
      date: new Date(),
      coords,
      distance,
      duration,
      [type === "running" ? "cadence" : "elevationGain"]: gain,
      [type === "running" ? "pace" : "speed"]: +duration / +distance,
      type,
    };

    setWorkouts((prev) => [
      ...prev,newWorkout
      ,
    ]);
    console.log(coords);
    setDistance("");
    setDuration("");
    setGain("");
    setCurrentWorkout(newWorkout)
    setShowForm(false);
    setShowSide(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.code === "Escape" && setShowForm(false);
    });
  }, []);

  return (
    <div className={`sidebar ${showSide ? "" : "hide-side"} `}>
      <button
        className="menu-btn"
        onClick={() => {
          setShowForm(false);
          setShowSide((prev) => !prev);
        }}
        style={{
          color: "white",
          fontSize: 16,
          width: "fit-content",
          padding: "0.5rem",
          backgroundColor: "transparent",
          alignSelf: "end",
          cursor: "pointer",
          borderRadius: "0.5rem",
        }}
      >
        <BiMenu />
      </button>
      <img src="/assets/logo.png" alt="Logo" className="logo" />

      <ul className="workouts">
        {showForm && (
          <button
            // className="menu-btn"
            onClick={() => setShowForm(false)}
            style={{
              color: "white",
              fontSize: 16,
              width: "fit-content",
              padding: "0.5rem",
              backgroundColor: "darkgrey",
              alignSelf: "end",
              cursor: "pointer",
              borderRadius: "0.5rem",
              marginRight: -15,
              marginTop: -20,
              position: "absolute",
            }}
          >
            <BiX />
          </button>
        )}
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
              value={distance}
              onChange={(e) => {
                const value = +e.target.value;
                console.log(value);
                if (!value || value < 1) return;
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
              value={duration}
              type="number"
              onChange={(e) => {
                const value = +e.target.value;
                if (!value || value < 1) return;
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
                value={gain}
                type="number"
                onChange={(e) => {
                  const value = +e.target.value;
                  if (!value || value < 1) return;
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
                value={gain}
                type="number"
                onChange={(e) => {
                  const value = +e.target.value;
                  if (!value || value < 1) return;
                  setGain(value);
                }}
                className="form__input form__input--elevation"
                placeholder="meters"
              />
            </div>
          )}
        </form>
        {showForm && (
          <button onClick={(e) => createNewWorkout(e)} className="form__btn">
            OK
          </button>
        )}

        {workouts.map((workout) =>
          workout.type === "running" ? (
            <li
              onClick={() => {
                setShowSide(false);
                setCurrentWorkout(workout);
              }}
              key={workout.id}
              className="workout workout--running"
              data-id="1234567890"
            >
              <h2 className="workout__title">{workout.descripiton}</h2>
              <div className="workout__details">
                <span className="workout__icon">🏃‍♂️</span>
                <span className="workout__value">{workout.distance}</span>
                <span className="workout__unit">km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⏱</span>
                <span className="workout__value">{workout.duration}</span>
                <span className="workout__unit">min</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⚡️</span>
                <span className="workout__value">
                  {workout.pace.toFixed(1)}
                </span>
                <span className="workout__unit">min/km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">🦶🏼</span>
                <span className="workout__value">{workout.cadence}</span>
                <span className="workout__unit">spm</span>
              </div>
            </li>
          ) : (
            <li
              key={workout.id}
              onClick={() => {
                setShowSide(false);
                setCurrentWorkout(workout);
              }}
              className="workout workout--cycling"
              data-id="1234567891"
            >
              <h2 className="workout__title">{workout.descripiton}</h2>
              <div className="workout__details">
                <span className="workout__icon">🚴‍♀️</span>
                <span className="workout__value">{workout.distance}</span>
                <span className="workout__unit">km</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⏱</span>
                <span className="workout__value">{workout.duration}</span>
                <span className="workout__unit">min</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⚡️</span>
                <span className="workout__value">
                  {workout.speed.toFixed(1)}
                </span>
                <span className="workout__unit">km/h</span>
              </div>
              <div className="workout__details">
                <span className="workout__icon">⛰</span>
                <span className="workout__value">{workout.elevationGain}</span>
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
