import React, { useEffect } from "react";
import ButtonComponent from "../components/ButtonComponent";
import TextComponent from "../components/TextComponent";
import PreviewContainer from "../components/PreviewContainer";
import { useComponents } from "../contexts/ComponentContext";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
// import { LOCAL_STORAGE } from "../constants/LocalStorage";

export default function Consumer() {
  const { components, setComponents } = useComponents();
  const router = useRouter();
  /*
  If admin saved template before, 
  consumer will check from local storage in the first 
  consumer page renders.

  It will load if some data exists from local storage

*/
  useEffect(() => {
    // let dataSaved = localStorage.getItem(LOCAL_STORAGE.SAVE_TEMPLATE)
    // if(dataSaved) {
    //   setComponents(dataSaved)
    // }
  }, []);

  const componentPreview =
    components.length > 0 &&
    components.map((component, index) => {
      if (true) {
        // omit first condition
        //create new element with available component
        const NewComponent = React.createElement(
          component.name == "ComponentButton" ? ButtonComponent : TextComponent,
          {
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
            style: { margin: "0.2rem 0" },
          },
          [NewComponent]
        );
      }
    });

  const handleBack2Admin = () => {
    router.push("/admin");
  };

  return (
    <div>
      <Button
        shape="round"
        style={{ background: "#cececece", margin: "0.5rem" }}
        onClick={handleBack2Admin}
      >
        <ArrowLeftOutlined />
        Back to Admin
      </Button>
      <div className="content" style={{ justifyContent: "center" }}>
        <div
          id="cont"
          style={{ width: "100%", height: "100%", padding: "0.3rem 0" }}
        >
          {componentPreview}
        </div>
      </div>
    </div>
  );
}
