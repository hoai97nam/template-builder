import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DRAG_TYPES } from "../constants/DragTypes";
import { useComponents } from "../contexts/ComponentsContext";
import ComponentName from "../components/ComponentName";
import ComponentButton from "../components/ComponentButton";
import PreviewContainer from "./PreviewContainer";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import fileDownload from 'js-file-download'

export default function Preview() {
  const [focused, setFocused] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const [buttonAlert, setButtonAlert] = useState("");
  const { components, setComponents } = useComponents();
  const [idShow, setId] = useState("");
  const [idHistories, setIdHistories] = useState(0);
  const [histories, setHistories] = useState([[]]);
  useEffect(() => {
    if (components.length > 0) {
      setHistories((pre) => [...pre, components]);
    }
  }, [components]);
  //

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [DRAG_TYPES.COMPONENT, DRAG_TYPES.BUTTON],
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      console.log("item dropped!", item);
      const componentStructure = {
        name: item.id,
        id: uuid(),
        props: {},
      };
      setComponents((prevValue) => {
        // setHistories((pre) => [...pre, [...prevValue, componentStructure]]);
        return [...prevValue, componentStructure];
      });

      setIdHistories(histories.length - 1);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  // const componentPreview=useCallback((comps)=>{
  //   if (comps.length > 0) {
  //     return components.map((component, index) => {
  //       if (true) {
  //         // omit first condition
  //         //create new element with available component
  //         const NewComponent = React.createElement(
  //           component.name == "ComponentButton"
  //             ? ComponentButton
  //             : ComponentName,
  //           {
  //             key: component.id,
  //             name: component.name,
  //             props: component.props,
  //           }
  //         );
  //         // add children to component
  //         return React.createElement(
  //           PreviewContainer,
  //           {
  //             key: component.id,
  //             index: component.id,
  //             onClick: clickHandler,
  //             focused: focused === index ? true : false,
  //           },
  //           [NewComponent]
  //         );
  //       }
  //     });
  //   }
  // },[components])
  const clickHandler = useCallback(
    (index) => {
      if (idShow && idShow == index) {
        setId("");
        setFocused(false);
      } else {
        setId(index);
        setFocused(true);
      }
      if (focused === index) {
        // setFocused(null);
      }
    },
    [focused, setFocused]
  );

  const componentPreview =
    components.length > 0 &&
    components.map((component, index) => {
      if (true) {
        // omit first condition
        //create new element with available component
        const NewComponent = React.createElement(
          // component.name == "ComponentButton"
          //   ? PreviewComponentsButton[component.name]
          //   : PreviewComponents[component.name],
          component.name == "ComponentButton" ? ComponentButton : ComponentName,
          {
            // @TODO: Use a hash here?
            key: component.id,
            name: component.name,
            props: component.props,
            // ...component.props,
          }
        );
        // add children to component
        return React.createElement(
          PreviewContainer,
          {
            key: component.id,
            index: component.id,
            onClick: clickHandler,
            focused: focused === index ? true : false,
          },
          [NewComponent]
        );
      }
    });
  //

  const updateProp = (index, txt) => {
    const componentsUpdated = components.map((x) => {
      return x.id !== index
        ? x
        : x.name === "ComponentButton"
        ? { ...x, props: { text: txt } }
        : { ...x, props: { text: txt } };
    });
    setComponents(componentsUpdated);
  };
  const updateAlert = (index, alert) => {
    const componentsUpdated = components.map((x) => {
      return x.id !== index
        ? x
        : x.name === "ComponentButton"
        ? { ...x, props: { ...x.props, message: alert } }
        : { ...x, props: { text: txt } };
    });
    setComponents(componentsUpdated);
  };

  const handleButtonCheck = (e) => {
    setButtonText(e.target.value);
    updateProp(idShow, e.target.value);
  };

  const handleButtonAlert = (e) => {
    setButtonAlert(e.target.value);
    updateAlert(idShow, e.target.value);
  };
  const handleUndo = () => {
    if (histories[histories.length - 1].length !== components.length) {
      setHistories((pre) => [...pre, components]);
      setIdHistories(histories.length - 1);
    }
    setComponents(histories[idHistories]);
    setIdHistories(idHistories - 1);
  };
  const handleRedo = () => {
    if (histories[histories.length - 1].length !== components.length) {
      setHistories((pre) => [...pre, components]);
      setIdHistories(histories.length - 1);
    }
    setIdHistories(idHistories + 1);
    setComponents(histories[idHistories]);
  };

  const handleSave = () => {
    // var doc = new jsPDF();
    doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
    doc.save("myDocument.pdf");
  };

  const dl =()=>{
    let x=document.getElementById('cont');
    fileDownload(x.outerHTML,`${Date.now()}.html`)
  }
  return (
    <>
      <div
      id="cont"
        ref={drop}
        width="400px"
        height="100vh"
        sx={{ border: "1px solid black" }}
      >
        {componentPreview}
      </div>
      {focused ? (
        <div>
          <label htmlFor="rollNumber">Button text:</label>
          <input
            type="text"
            name="buttonText"
            id="buttonText"
            onChange={handleButtonCheck}
          />
          <label htmlFor="name">Alert message:</label>
          <input
            type="text"
            name="alert"
            id="alert"
            onChange={handleButtonAlert}
          />
        </div>
      ) : null}

      <div>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={dl}>Export</button>
        <p>{idHistories}</p>
      </div>
    </>
  );
}
