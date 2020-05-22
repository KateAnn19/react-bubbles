import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);
  const [loading, setIsLoading] = useState(false);
console.log(newColor)
  const { push } = useHistory();
  const { id } = useParams();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)

      // Make a put request to save your updated color
      .then((res) => {
        setIsLoading(true);
        updateColors([...colors, res.data]);
        setEditing(false);
        setTimeout(function () {
          setIsLoading(false);
          push("/protected");
        }, 2000);
      })
      .catch((err) => console.log(err));

    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        setIsLoading(true);
        updateColors(
          (colors = colors.filter((color) => color.id !== res.data))
        );

        setTimeout(function () {
          setIsLoading(false);
          //push('/protected')
        }, 2000);
      });
  };

  const addColor = (e) => {
    e.preventDefault();
    console.log("this is new color", newColor);
    axiosWithAuth()
      .post("/api/colors/", newColor)
      .then((res) => {
        console.log(res.data);
        updateColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const changeHandler = (ev) => {
  //   console.log(newColor)
  //   setNewColor({
  //     ...newColor,
  //     [ev.target.name]: ev.target.value,
  //   });
  //   console.log(newColor)
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {colors.map((color) => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteColor(color);
                  }}
                >
                  x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
      )}
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      <form onSubmit={addColor}>
        <label>
          color name:
          <input
            name="color"
            onChange={(e) =>
              // console.log(newColor)
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            name="code"
            onChange={(e) =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value },
            })}
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
