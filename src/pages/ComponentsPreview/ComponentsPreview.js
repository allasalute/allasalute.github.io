// @flow

import React, { useState, type Element } from "react";
import Button from "components/Elements/Button/Button";
import Modal from "components/Elements/Modal/Modal";
import Input from "components/Elements/Input/Input";
import Card from "components/Elements/Card/Card";
import Tag from "components/Elements/Tag/Tag";

// Let's simulate a large dataset on the server (outside of our component)

type Props = {};

const ComponentsPreview = (props: Props): Element<any> => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe"
  });

  return (
    <div>
      <section className="u-padding u-background-light-grey">
        <h2>Buttons</h2>
        <Button className="u-margin-tiny">Normal Button</Button>
        <Button className="c-button--secondary u-margin-tiny">Secondary Button</Button>
        <Button className="c-button--text u-margin-tiny">Text Button</Button>
        <Button className="u-margin-tiny" disabled>
          Disabled Button
        </Button>
        <Button isLight className="u-margin-tiny">
          Light Button
        </Button>
        <Button className="u-margin-tiny" size="sm">
          Small Button
        </Button>
      </section>
      <section className="u-padding">
        <h2>Modal</h2>
        <Button className="u-margin-tiny" onClick={() => setModalVisible(true)}>
          Open Modal
        </Button>
        {modalVisible && (
          <Modal onClose={() => setModalVisible(false)}>
            <div className="u-flex u-flex--column">
              <h3 className="c-modal__title">Hey, i'm a modal!</h3>
              <p>
                And i'm a load of text explaining something that the user should be aware of, like confirming will cause
                something bad to happen.
              </p>
            </div>
          </Modal>
        )}
      </section>

      <section className="u-padding">
        <h2>Card (no top border)</h2>
        <Card>
          <h3>Hey, i'm a card</h3>
          <p>With some text</p>
        </Card>
      </section>

      <section className="u-padding">
        <h2>Tags</h2>
        <Tag className="u-margin-right-tiny" text="These" />
        <Tag className="u-margin-horizontal-tiny" text="are" />
        <Tag className="u-margin-horizontal-tiny" text="some" />
        <Tag className="u-margin-horizontal-tiny" text="tags" />
      </section>

      <section className="u-padding">
        <h2>Inputs</h2>
        <Input label="Name" id="name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
      </section>
    </div>
  );
};

export default ComponentsPreview;
