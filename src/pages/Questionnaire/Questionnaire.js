// @flow

import React, { useEffect, useState, type Element } from "react";
import ReactGA from "react-ga";
import { type Location } from "react-router-dom";
import { type QuestionList, type Response } from "constants/types";
import CartaBevande from "assets/images/drinks/elencobevande.png";
import drinkingImage from "assets/images/illustrations/drinking.svg";
import smokerImage from "assets/images/illustrations/smoker.svg";
import heightImage from "assets/images/illustrations/height.svg";
import weightImage from "assets/images/illustrations/weight.svg";
import Questions from "components/Questions/Questions";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type LocationProp = {
  ...Location,
  id: string
};
type Props = {
  +questions: Array<QuestionList>,
  +questionnairePagesAnalytics: Array<String>,
  +response: Array<Response>,
  +getQuestionnaire: () => any,
  +setResponse: () => any,
  +location: LocationProp
};

function Questionnaire(props: Props): Element<any> {
  const { questions, response, getQuestionnaire, setResponse, location } = props;
  const [image, setImage] = useState(drinkingImage);

  useEffect(() => {
    getQuestionnaire();
  }, [getQuestionnaire]);

  useEffect(() => {
    // Assume that questions is only loaded once and the default starting
    // questions is the first one
    if (questions && window.ga) {
      ReactGA.pageview(questions[0].analyticsPageView);
    }
  }, [questions]);

  const updateImage = (questionNumber: number) => {
    switch (questionNumber) {
      case 0:
      case 1:
      case 2:
        setImage(CartaBevande);
        break;
      case 3:
        setImage(smokerImage);
        break;
      case 4:
        setImage(heightImage);
        break;
      case 5:
        setImage(weightImage);
        break;
      default:
        setImage(drinkingImage);
        break;
    }
    if (window.ga) {
      ReactGA.pageview(questions[questionNumber].analyticsPageView);
    }
  };

  return (
    <ContentWithSidebar sidebarImage={image} isHomeBtnVisible={false} isShareVisible>
      <Questions
        questionsList={questions}
        responses={response}
        onChange={updateImage}
        onAnswer={setResponse}
        questionNumberProp={location?.id}
      />
    </ContentWithSidebar>
  );
}

export default Questionnaire;
