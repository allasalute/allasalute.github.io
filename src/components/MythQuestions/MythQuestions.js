// @flow

import React, { useState, type Element } from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

import Input from "components/Elements/Input/Input";
import Button from "components/Elements/Button/Button";
import ProgressBar from "components/Elements/ProgressBar/ProgressBar";

type Props = {
  +questionsList: Array<any>,
  +onChange: number => void
};

const MythQuestions = (props: Props): Element<any> => {
  const { questionsList, onChange } = props;

  const { t } = useTranslation();

  const [radio, setRadio] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const isOptionSelected = radio !== null;
  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.sm });

  const radioWrapperClasses = classnames(
    "u-flex",
    "u-flex--wrap",
    isMobile && "u-flex--space-between",
    "c-myth__radio-wrapper",
    isOptionSelected && "c-myth__radio-wrapper--is-active"
  );

  const buttonWrapperClasses = classnames(
    "u-margin-top-auto",
    !isMobile && "u-flex",
    questionCount >= 1 && "u-flex--space-between",
    questionCount < 1 && "u-flex--justify-end",
    isMobile && "u-d-block"
  );

  const currentQuestion = questionsList?.[questionCount];
  const isIncorrectAnswer = currentQuestion?.value !== radio;

  const radioClasses = classnames("c-myth__radio", isIncorrectAnswer && "is-incorrect");

  const totalSteps = questionsList?.length ?? 0;

  const incrementQuestion = (questionCount: number) => {
    setQuestionCount(questionCount + 1);
    onChange(questionCount + 1);
    setRadio(null);
  };
  const decrementQuestion = (questionCount: number) => {
    setQuestionCount(questionCount - 1);
    onChange(questionCount - 1);
    setRadio(null);
  };

  const isPreviousQuestionAvailable = questionCount > 0;
  const isFinalQuestion = questionCount === questionsList.length - 1;

  return (
    <>
      <ProgressBar
        max={totalSteps}
        min={0}
        value={questionCount}
        category={t(`myths.${currentQuestion.key}.category`)}
      />

      <div>
        <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
          {t(`myths.${currentQuestion.key}.title`)}
        </h2>

        <div className={radioWrapperClasses} data-testid="questionnaire-radio">
          <Input
            className={radioClasses}
            label={t("common.true")}
            id={`${currentQuestion.key}-true`}
            key={`${currentQuestion.key}-true`}
            type="radio"
            showLabel
            value={true}
            name="radio-select-card"
            checked={radio === true}
            onChange={() => {
              setRadio(true);
            }}
            isCard
            tabIndex="0"
          />
          <Input
            className={radioClasses}
            label={t("common.false")}
            id={`${currentQuestion.key}-false`}
            key={`${currentQuestion.key}-false`}
            type="radio"
            showLabel
            value={false}
            name="radio-select-card"
            checked={radio === false}
            onChange={() => {
              setRadio(false);
            }}
            isCard
            tabIndex="0"
          />
        </div>

        {isOptionSelected && <p>{t(`myths.${currentQuestion.key}.${radio ? "true" : "false"}`)}</p>}
      </div>

      <div className={buttonWrapperClasses}>
        {isPreviousQuestionAvailable && (
          <Button
            className="c-button c-button--secondary u-margin-top-auto u-flex--align-self-end c-myth__btn"
            onClick={() => decrementQuestion(questionCount)}
          >
            {t("common.previous")}
          </Button>
        )}

        {isOptionSelected && !isFinalQuestion && (
          <Button
            className="c-button c-button--primary u-margin-top-auto u-flex--align-self-end c-myth__btn"
            onClick={() => incrementQuestion(questionCount)}
          >
            {t("common.next")}
          </Button>
        )}

        {isOptionSelected && isFinalQuestion && (
          <Link
            to="/home"
            className="c-button c-button--primary c-button--md u-margin-top-auto u-flex--align-self-end u-text-center c-questionnaire__btn"
          >
            {t("common.back")}
          </Link>
        )}
      </div>
    </>
  );
};

export default MythQuestions;
