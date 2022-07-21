import styled from "styled-components";
import DraggableButtonComponent from "../components/DragButton";
import DraggableComponent from "../components/DragText";

import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DRAG_TYPES } from "../constants/DragTypes";
import ComponentName from "../components/ComponentText";
import ComponentButton from "../components/ComponentButton";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import fileDownload from "js-file-download";
import { useComponents } from "../contexts/ComponentContext";
import PreviewContainer from "../components/PreviewContainer";
import { useRouter } from "next/router";
import { Button, Space, Row, Form, Input, Col, Tooltip } from "antd";
import EditButton from "../components/EditButton";
import EditText from "../components/EditText";
import { LOCAL_STORAGE } from "../constants/LocalStorage";

const AdminStyed = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  background-color: #fefefe;
  /* grid-template-rows: auto repeat(4, 1fr) auto; */
  height: 100vh;
  grid-gap: 0.2rem;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "sidebar content content"
    "sidebar content content"
    "sidebar content content"
    "sidebar foot foot";
  div {
    /* border: 1px solid grey; */
  }
  .header {
    grid-area: header;
  }
  .sidebar {
    grid-area: sidebar;
    background-color: #cecece91;
    border-radius: 1rem;
  }
  .content {
    grid-area: content;
    border-radius: 0.5rem;
    height: 400px;
    max-height: inherit;
    overflow-y: scroll;
    background-color: #cecece75;
  }
  .foot {
    grid-area: foot;
  }
`;

export default function Admin() {
  const [focused, setFocused] = useState(null);
  const [btnEdit, setBtnEdit] = useState(false);
  const [txtEdit, setTxtEdit] = useState(false);
  const { components, setComponents } = useComponents();
  const [idShow, setId] = useState("");
  const [idHistories, setIdHistories] = useState(0);
  const [histories, setHistories] = useState([[]]);
  const router = useRouter();
  useEffect(() => {
    if (components.length > 0) {
      setHistories((pre) => [...pre, components]);
    }
  }, [components]);

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [DRAG_TYPES.PARAGRAPH, DRAG_TYPES.BUTTON],
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      // console.log("item dropped!", item);
      const componentStructure = {
        name: item.id,
        id: `${item.id === "ComponentText" ? "T" : "B"}-${uuid()}`,
        props: {},
      };
      setComponents((prevValue) => {
        return [...prevValue, componentStructure];
      });

      setIdHistories(histories.length - 1);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const clickHandler = useCallback(
    (index) => {
      let x = index.substring(0, 1);
      if (idShow && idShow == index) {
        setId("");
        setFocused(false);
        setTxtEdit(false);
        setBtnEdit(false);
      } else {
        x == "T" ? setTxtEdit(true) : setBtnEdit(true);
        setId(index);
        setFocused(true);
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
          component.name == "ComponentButton" ? ComponentButton : ComponentName,
          {
            // @TODO: Use a hash here?
            key: component.id,
            name: component.name,
            props: component.props,
          }
        );
        // add children to component
        return React.createElement(
          PreviewContainer,
          {
            key: component.id,
            index: component.id,
            onClick: clickHandler,
            focused: focused,
            style: { margin: "0.2rem 0", focused: true },
          },
          [NewComponent]
        );
      }
    });
  //

  const updateProp = (index, txt) => {
    const componentsUpdated = components.map((x) => {
      return x.id !== index ? x : { ...x, props: { text: txt } };
    });
    setComponents(componentsUpdated);
  };

  const updateAlert = (index, alert) => {
    const componentsUpdated = components.map((x) => {
      return x.id !== index && x.name !== "ComponentButton"
        ? x
        : { ...x, props: { ...x.props, message: alert } };
    });
    setComponents(componentsUpdated);
  };

  const handleContent = (e) => {
    updateProp(idShow, e.target.value);
  };

  const handleButtonAlert = (e) => {
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

  //   const handleSave = () => {
  //     doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
  //     doc.save("myDocument.pdf");
  //   };

  const handleExport = () => {
    let x = document.getElementById("cont");
    fileDownload(x.outerHTML, `${Date.now()}.html`);
  };

  const handleView = () => {
    router.push("/consumer");
  };

  const handleDeleteComponent = () => {
    if (idShow) {
      setComponents(components.filter((x) => x.id !== idShow));
      setId("");
      setBtnEdit(false);
      setTxtEdit(false);
    }
  };
  const handleSave = () => {
    if (!localStorage.getItem(LOCAL_STORAGE.SAVE_TEMPLATE)) {
      let x = document.getElementById("cont");
      localStorage.setItem(LOCAL_STORAGE.SAVE_TEMPLATE, x.innerHTML);
      alert("Save to local storage");
    }
  };
  const handleImport = () => {
    alert("Have not implemented yet!");
  };
  return (
    <AdminStyed>
      <div className="header">
        <Row align="center">
          <Space size={10} style={{ margin: "0.3rem 0" }}>
            <Tooltip title="Save to local storage">
              <Button shape="round" onClick={handleSave}>
                Save
              </Button>
            </Tooltip>
            <Tooltip title="Implementing" color={"red"}>
              <Button shape="round" onClick={handleUndo}>
                Undo
              </Button>
            </Tooltip>
            <Tooltip title="Implementing" color={"red"}>
              <Button shape="round" onClick={handleRedo}>
                Redo
              </Button>
            </Tooltip>
            <Button shape="round" onClick={handleExport}>
              Export
            </Button>
            <Tooltip title="Have not implemented yet" color={"orange"}>
              <Button shape="round" onClick={handleImport}>
                Import
              </Button>
            </Tooltip>
            <Button shape="round" onClick={handleView}>
              View
            </Button>
          </Space>
        </Row>
      </div>
      <div className="sidebar">
        <DraggableComponent />
        <DraggableButtonComponent />
      </div>
      <div className="content" style={{ justifyContent: "center" }}>
        <div
          id="cont"
          ref={drop}
          style={{ width: "100%", height: "100%", padding: "0.3rem 0" }}
        >
          {componentPreview}
        </div>
      </div>
      <div className="foot">
        {focused ? (
          btnEdit ? (
            <EditButton
              handleBtnTxt={handleContent}
              handleBtnAlert={handleButtonAlert}
              handleDelete={handleDeleteComponent}
            />
          ) : txtEdit ? (
            <EditText
              handleTxt={handleContent}
              handleDelete={handleDeleteComponent}
            />
          ) : null
        ) : null}
      </div>
    </AdminStyed>
  );
}
