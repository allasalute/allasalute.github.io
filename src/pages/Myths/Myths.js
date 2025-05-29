// @flow

import React, { useState, type Element } from "react";

import deodorantImage from "assets/images/illustrations/myths/deodorant.svg";
import braImage from "assets/images/illustrations/myths/bra.svg";
import drinksImage from "assets/images/illustrations/myths/drinks.svg";
import hrtImage from "assets/images/illustrations/myths/hrt.svg";
import scalesImage from "assets/images/illustrations/myths/scales.svg";
import watermelonImage from "assets/images/illustrations/myths/watermelon.svg";

import MythQuestions from "components/MythQuestions/MythQuestions";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

import { mythOrRiskQuestions } from "constants/mythQuestions";

type Props = {};

function MythsQuestionnaire(props: Props): Element<any> {
  const [image, setImage] = useState(deodorantImage);

  const updateImage = (questionNumber: number) => {
    switch (questionNumber) {
      case 0:
        setImage(deodorantImage);
        break;
      case 1:
        setImage(scalesImage);
        break;
      case 2:
        setImage(hrtImage);
        break;
      case 3:
        setImage(braImage);
        break;
      case 4:
        setImage(drinksImage);
        break;
      default:
        setImage(watermelonImage);
        break;
    }
  };

  return (
    <ContentWithSidebar sidebarImage={image} homeButtonType="back">
      <MythQuestions questionsList={mythOrRiskQuestions} onChange={updateImage} />
    </ContentWithSidebar>
  );
}

export default MythsQuestionnaire;
