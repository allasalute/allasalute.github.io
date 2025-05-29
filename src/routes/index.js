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
import LayoutWithHeader from "components/Layout/LayoutWithHeader";

const withHeader = Component => props =>
  (
    <LayoutWithHeader>
      <Component {...props} />
    </LayoutWithHeader>
  );

const AppRoutes = props => {
  return (
    <Switch>
      <Route exact path="/" component={withHeader(Landing)} />
      <Route exact path="/cookiePreferences" component={CookiePreferences} />
      <Route exact path="/questionnaire" component={withHeader(Questionnaire)} />
      <Route exact path="/changeRisks" component={withHeader(ChangeRisks)} />
      <Route exact path="/tips" component={withHeader(TopTips)} />
      <Route exact path="/stayingActive" component={withHeader(StayingActive)} />
      <Route exact path="/drinkCalculator" component={withHeader(DrinkCalculator)} />
      <Route exact path="/alcoholRisks" component={withHeader(AlcoholRisks)} />
      <Route exact path="/weight" component={withHeader(Weight)} />
      <Route exact path="/wellbeing" component={withHeader(Wellbeing)} />
      <Route exact path="/smoking" component={withHeader(Smoking)} />
      <Route exact path="/myths" component={withHeader(Myths)} />
      <Route exact path="/home" component={withHeader(Home)} />
      <Route exact path="/results" component={withHeader(Results)} />
      <Route exact path="/components" component={ComponentPreview} />
      <Route exact path="/foo" component={ComponentPreview} />
      <Route exact path="/bar" component={ComponentPreview} />
    </Switch>
  );
};
export default AppRoutes;
