import React from "react";
import { Route, Switch } from "react-router-dom";
import ComponentPreview from "pages/ComponentsPreview/ComponentsPreview";
import Landing from "pages/Landing/Landing";
import CookiePreferences from "pages/CookiePreferences/CookiePreferences";
import Questionnaire from "pages/Questionnaire/QuestionnaireContainer";
import ChangeRisks from "pages/ChangeRisks/ChangeRisks";
import Results from "pages/Results/ResultsContainer";
import Home from "pages/Home/HomeContainer";
import Myths from "pages/Myths/Myths";
import DrinkCalculator from "pages/DrinkCalculator/DrinkCalculator";
import AlcoholRisks from "pages/AlcoholRisks/AlcoholRisks";
import Smoking from "pages/Smoking/Smoking";
import Weight from "pages/Weight/Weight";
import Wellbeing from "pages/Wellbeing/Wellbeing";
import TopTips from "pages/TopTips/TopTips";
import StayingActive from "pages/StayingActive/StayingActive";

export default props => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cookiePreferences" component={CookiePreferences} />
      <Route exact path="/questionnaire" component={Questionnaire} />
      <Route exact path="/changeRisks" component={ChangeRisks} />
      <Route exact path="/tips" component={TopTips} />
      <Route exact path="/stayingActive" component={StayingActive} />
      <Route exact path="/drinkCalculator" component={DrinkCalculator} />
      <Route exact path="/alcoholRisks" component={AlcoholRisks} />
      <Route exact path="/weight" component={Weight} />
      <Route exact path="/wellbeing" component={Wellbeing} />
      <Route exact path="/smoking" component={Smoking} />
      <Route exact path="/myths" component={Myths} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/results" component={Results} />
      <Route exact path="/components" component={ComponentPreview} />
      <Route exact path="/foo" component={ComponentPreview} />
      <Route exact path="/bar" component={ComponentPreview} />
    </Switch>
  );
};
