// @flow

import React, { useEffect, useState, type Element } from "react";
import ReactGA from "react-ga";
import { type Location, useHistory } from "react-router-dom";
import { type QuestionList, type Response } from "constants/types";
//import CartaBevande from "assets/images/drinks/NewDrinksCardCompressed.svg";
import drinkingImage from "assets/images/illustrations/drinking.svg";
import smokerImage from "assets/images/illustrations/smoker.svg";
import heightImage from "assets/images/illustrations/height.svg";
import weightImage from "assets/images/illustrations/weight.svg";
import walkImage from "assets/images/illustrations/walk.svg";
import runImage from "assets/images/illustrations/running.svg";
import bikeImage from "assets/images/illustrations/bike.svg";
import Questions from "components/Questions/Questions";
import ContentWithSidebar from "components/ContentWithSidebar/ContentWithSidebar";

type LocationProp = {
  ...Location,
  +endSession: (history: any) => void,
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
  const { questions, response, getQuestionnaire, setResponse, location, endSession } = props;
  const [image, setImage] = useState(drinkingImage);
  const history = useHistory();

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
    window.scrollTo(0, 0); // Forza scroll in alto
    switch (questionNumber) {
      case 0:
        setImage(drinkingImage);
        break;
      case 1:
      case 2:
        setImage(drinkingImage);
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
      case 6:
        setImage(runImage);
        break;
      case 7:
        setImage(bikeImage);
        break;
      case 8:
        setImage(walkImage);
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
    <>
      <ContentWithSidebar
        sidebarImage={image}
        isHomeBtnVisible={false}
        isResultsBtnVisible={false}
        isShareVisible={false}
        isEndSessionBtnVisible={true}
        onEndSession={() => endSession(history)}
      >
        <Questions
          questionsList={questions}
          responses={response}
          onChange={updateImage}
          onAnswer={setResponse}
          questionNumberProp={location?.id}
        />
      </ContentWithSidebar>
    </>
  );
}

export default Questionnaire;
