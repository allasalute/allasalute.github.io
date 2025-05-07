// @flow

import React, { useEffect, useState, useRef, type Element } from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { responsiveBreakpoint } from "constants/responsiveBreakpoint";

import UnitKey from "components/UnitKey/UnitKey";
import Input from "components/Elements/Input/Input";
import Button from "components/Elements/Button/Button";
import Modal from "components/Elements/Modal/Modal";
import ProgressBar from "components/Elements/ProgressBar/ProgressBar";
import { type QuestionList, type Question, type Response, type Option, type UnitTypeEnum } from "constants/types";

import TabHeader from "components/Elements/TabHeader/TabHeader";

type Props = {
  +questionsList: Array<QuestionList>,
  +responses: Array<Response>,
  +onChange: number => void,
  +onAnswer: Response => void,
  +questionNumberProp: ?string
};

const Questions = (props: Props): Element<any> => {
  const { questionsList, responses, onChange, onAnswer, questionNumberProp } = props;

  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: responsiveBreakpoint.sm });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("one");
  const [radio, setRadio] = useState(null);
  const [responseSelected, setResponseSelected] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [numberOfCm, setNumberOfCm] = useState(0);
  const [numberOfKg, setNumberOfKg] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [numberOfMinutes, setNumberOfMinutes] = useState(null);
  const [numberOfFeet, setNumberOfFeet] = useState(null);
  const [numberOfInches, setNumberOfInches] = useState(null);
  const [numberOfStone, setNumberOfStone] = useState(null);
  const [numberOfLbs, setNumberOfLbs] = useState(null);

  const numberInputRef = useRef(null);
  const numberInputTwoRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRefs = { days: useRef(null), minutes: useRef(null) };

  const buttonWrapperClasses = classnames(
    !isMobile && "u-flex",
    questionCount >= 1 && "u-flex--space-between",
    questionCount < 1 && "u-flex--justify-end",
    isMobile && "u-d-block"
  );

  const radioWrapperClasses = classnames(
    "u-flex",
    "u-flex--wrap",
    "u-flex--space-between",
    "c-questionnaire__radio-wrapper",
    responseSelected && "c-questionnaire__radio-wrapper--is-active"
  );

  useEffect(() => {
    if (responses?.length >= questionCount && responses?.[questionCount]?.value) {
      if (questionCount < 4) {
        setRadio(responses[questionCount].value);
      } else {
        setResponseSelected(responses[questionCount].value);
      }
    } else {
      setRadio(null);
      setResponseSelected(false);
    }
  }, [questionCount, responses]);

  useEffect(() => {
    if (questionNumberProp) {
      setQuestionCount(Number(questionNumberProp));
    }
  }, [questionNumberProp]);

  const currentQuestion = questionsList?.[questionCount];
  console.log("currentQuestion:", currentQuestion);
  const currentResponse = responses?.[questionCount];
  const previousQuestionKey = useRef(null);

  useEffect(() => {
    if (currentQuestion?.questionType === "time" && currentQuestion?.key !== previousQuestionKey.current) {
      previousQuestionKey.current = currentQuestion?.key;

      const value = currentResponse?.value;
      if (typeof value === "string" && value.includes(",")) {
        const [days, minutes] = value.split(",").map(Number);
        setNumberOfDays(days ?? null);
        setNumberOfMinutes(minutes ?? null);
      } else {
        setNumberOfDays(null);
        setNumberOfMinutes(null);
      }
    }
  }, [currentQuestion, currentResponse]);

  const isUserTeetotal = responses.some(item => item.question === "one" && item.value === "0");
  const totalSteps = isUserTeetotal ? 7 : questionsList?.length ?? 0;

  const incrementQuestion = (questionCount: number, isUserTeetotal: boolean) => {
    const isFirstQuestion = questionsList?.[questionCount].key === "one";
    const amountToIncrease = isFirstQuestion && isUserTeetotal ? 3 : 1;

    setQuestionCount(questionCount + amountToIncrease);
    onChange(questionCount + amountToIncrease);
  };

  const decrementQuestion = (questionCount: number, isUserTeetotal: boolean) => {
    const isFourthQuestion = questionsList?.[questionCount].key === "four";
    const amountToIncrease = isFourthQuestion && isUserTeetotal ? 3 : 1;

    setQuestionCount(questionCount - amountToIncrease);
    onChange(questionCount - amountToIncrease);
  };

  const selectResponse = (question: Question) => {
    setRadio(question.value);
    onAnswer({
      question: questionsList[questionCount].key,
      value: question.value
    });
    setResponseSelected(true);
  };

  const convertFeetAndInchesToCm = (unit?: UnitTypeEnum, value?: string) => {
    if (value === "") {
      const valueToReturn = unit === "inch" ? (numberOfFeet ?? 0) * 30.48 : (numberOfInches ?? 0) * 2.54;
      return Number(valueToReturn);
    }
    if (unit && value) {
      const ftValue = unit === "ft" ? value : numberOfFeet;
      const inchValue = unit === "inch" ? value : numberOfInches;
      return Number(ftValue) * 30.48 + Number(inchValue) * 2.54;
    } else {
      return Number(numberOfFeet) * 30.48 + Number(numberOfInches) * 2.54;
    }
  };

  const convertStoneAndLbsToKg = (unit?: UnitTypeEnum, value?: string) => {
    if (value === "") {
      const valueToReturn = unit === "lbs" ? (numberOfStone ?? 0) * 6.35 : (numberOfLbs ?? 0) / 2.205;
      return Number(valueToReturn);
    }

    if (unit && value) {
      const stValue = unit === "st" ? value : numberOfStone;
      const lbsValue = unit === "lbs" ? value : numberOfLbs;
      return (Number(stValue) * 6.35 + Number(lbsValue) / 2.205).toFixed(1);
    } else {
      return (Number(numberOfStone) * 6.35 + Number(numberOfLbs) / 2.205).toFixed(1);
    }
  };

  const getHeartsForQuestion = key => {
    switch (key) {
      case "seven": // intensa
        return "❤️❤️❤️";
      case "eight": // moderata
        return "❤️❤️";
      case "nine": // camminata
        return "❤️";
      default:
        return "";
    }
  };

  const updateTimeResponse = (unit, value) => {
    const days = unit === "days" ? value : numberOfDays;
    const minutes = unit === "minutes" ? value : numberOfMinutes;

    const finalValue = `${days || 0},${minutes || 0}`;

    onAnswer({
      question: currentQuestion.key,
      value: finalValue
    });

    setResponseSelected(true);
  };

  const convertValue = (type: UnitTypeEnum, value: string) => {
    const convertValueToNumber = Number(value);
    const convertCmToFeet = convertValueToNumber / 30.48; // Formula: divide the cm height value by 30.48
    const footRemainder = "0." + convertCmToFeet.toString().split(".")[1]; // take the remaining foot value
    const inchesTimesTwelve = parseFloat(footRemainder) * 12; // times by 12 because there are 12 inches in a foot
    const formattedValueInInches = Math.round(inchesTimesTwelve) < 12 ? Math.round(inchesTimesTwelve) : 0; // if there's less than 12 inches, round the remainder, else display 0.
    const formattedValueInFeet =
      Math.round(inchesTimesTwelve) < 12 ? Math.floor(convertCmToFeet) : Math.round(convertCmToFeet); // decide if to round up or round down the foot value

    const convertKgToLbs = convertValueToNumber * 2.205;
    const stone = convertKgToLbs / 14;
    const stoneRemainder = "0." + stone.toString().split(".")[1]; // take the remaining stone value
    const lbsTimesFourteen = parseFloat(stoneRemainder) * 14; // times by 14 because there are 14 pounds in a stone

    const formattedValueInLbs = Math.round(lbsTimesFourteen) < 14 ? Math.round(lbsTimesFourteen) : 0; // if there's less than 14 lbs, display the remainder, else display 0.
    const formattedValueInStone = Math.round(lbsTimesFourteen) < 14 ? Math.floor(stone) : Math.round(stone); // decide if to round up or round down the foot value

    switch (type) {
      case "ft":
        return formattedValueInFeet;
      case "cm":
        return Math.round(convertValueToNumber);
      case "inch":
        return formattedValueInInches;
      case "st":
        return formattedValueInStone;
      case "lbs":
        return formattedValueInLbs;
      case "kg":
        return Math.round(convertValueToNumber * 10) / 10;
      case "days":
        return Math.round(convertValueToNumber);
      case "minutes":
        return Math.round(convertValueToNumber);
      default:
        return 0;
    }
  };

  const getStateValueForUnitType = (type: UnitTypeEnum, value: string) => {
    // if state value exists, use that, otherwise use the response value
    const ukAverageHeightInCm = "162";
    const defaultWeight = "0";
    switch (type) {
      case "ft":
        if (numberOfFeet === 0) {
          const convertCmToFeet = convertValue("ft", responses[questionCount].value ?? ukAverageHeightInCm);
          return convertCmToFeet;
        } else if (numberOfFeet !== null) {
          return numberOfFeet;
        } else {
          const convertCmToFeet = convertValue("ft", responses[questionCount].value ?? ukAverageHeightInCm);
          setNumberOfFeet(convertCmToFeet);
          return convertCmToFeet;
        }
      case "inch":
        if (numberOfInches === 0) {
          const convertCmToInches = convertValue("inch", responses[questionCount].value ?? ukAverageHeightInCm);
          return convertCmToInches;
        } else if (numberOfInches !== null) {
          return numberOfInches;
        } else {
          const convertCmToInches = convertValue("inch", responses[questionCount].value ?? ukAverageHeightInCm);
          setNumberOfInches(convertCmToInches);
          return convertCmToInches;
        }
      case "st":
        if (numberOfStone === 0) {
          const convertKgToStone = convertValue("st", responses[questionCount].value ?? defaultWeight);
          return convertKgToStone;
        } else if (numberOfStone !== null) {
          return numberOfStone;
        } else {
          const convertKgToStone = convertValue("st", responses[questionCount].value ?? defaultWeight);
          return convertKgToStone;
        }
      case "lbs":
        if (numberOfStone === 0) {
          const convertKgToLbs = convertValue("lbs", responses[questionCount].value ?? defaultWeight);
          return convertKgToLbs;
        } else if (numberOfLbs !== null) {
          return numberOfLbs;
        } else {
          const convertKgToLbs = convertValue("lbs", responses[questionCount].value ?? defaultWeight);
          return convertKgToLbs;
        }
      case "kg":
        if (numberOfKg) {
          return numberOfKg;
        } else {
          return responses[questionCount].value;
        }
      case "cm":
        if (numberOfCm) {
          return numberOfCm;
        } else {
          return responses[questionCount].value;
        }
      case "days":
        if (numberOfDays) {
          return numberOfDays !== null && numberOfDays !== undefined
            ? numberOfDays
            : responses[questionCount].value?.split(",")[0] ?? "";
        } else {
          return responses[questionCount].value;
        }
      case "minutes":
        if (numberOfMinutes) {
          return numberOfMinutes !== null && numberOfMinutes !== undefined
            ? numberOfMinutes
            : responses[questionCount].value?.split(",")[1] ?? "";
        } else {
          return responses[questionCount].value;
        }
      default:
        return 0;
    }
  };

  const renderCurrentStepCount = (isUserTeetotal, questionCount) => {
    if (isUserTeetotal) {
      switch (questionCount) {
        case 0:
          return 0;
        case 3:
          return 1;
        case 4:
          return 2;
        case 5:
          return 3;
        case 6:
          return 4;
        case 7:
          return 5;
        case 8:
          return 6;
        default:
          return questionCount;
      }
    } else {
      return questionCount;
    }
  };

  const onTabChange = (optionInformation: Option) => {
    const unitType = optionInformation.items[0];
    const unitLabel = optionInformation.label;
    if (unitType === "kg") {
      const totalInKg = convertStoneAndLbsToKg();
      if (Number(totalInKg) > 0) {
        setNumberOfKg(totalInKg);
      } else {
        setNumberOfKg(responses[questionCount].value ?? "0");
      }
    } else if (unitType === "days") {
      setNumberOfDays(responses[questionCount].value ?? "");
    } else if (unitType === "minutes") {
      setNumberOfMinutes(responses[questionCount].value ?? "");
    } else if (unitType === "cm") {
      const totalInCm = convertFeetAndInchesToCm();
      setNumberOfCm(Math.round(totalInCm));
    } else if (unitType === "ft") {
      const totalOfFeet = convertValue("ft", numberOfCm.toString());
      const totalOfInches = convertValue("inch", numberOfCm.toString());
      setNumberOfFeet(totalOfFeet);
      setNumberOfInches(totalOfInches);
    } else if (unitType === "st") {
      const totalOfStone = convertValue("st", numberOfKg.toString());
      const totalOfLbs = convertValue("lbs", numberOfKg.toString());
      setNumberOfStone(totalOfStone);
      setNumberOfLbs(totalOfLbs);
    }
    setSelectedUnit(unitLabel);
  };

  const isQuestionRequired = questionsList?.[questionCount]?.key !== "five";
  const isQuestionAnswered = responses?.[questionCount]?.value ? false : true;
  const isFinalQuestion = questionsList?.[questionCount]?.key === "nine" && currentResponse?.question === "nine";
  const isViewResultsButtonEnabled = Boolean(currentResponse?.value);
  //const isViewResultsButtonEnabled = parseFloat(currentResponse?.value) > 0;

  const viewResultsButtonClasses = classnames(
    "c-button c-button--primary c-button--md u-margin-top-auto u-flex--align-self-end u-text-center c-questionnaire__btn",
    isViewResultsButtonEnabled && "is-disabled"
  );

  const maxValues = {
    days: 7,
    minutes: 60
  };
  const [errors, setErrors] = useState({
    days: null,
    minutes: null
  });
  const isTimeQuestion = currentQuestion?.questionType === "time";

  const isValidTime = () =>
    numberOfDays !== null &&
    numberOfMinutes !== null &&
    numberOfDays >= 0 &&
    numberOfDays <= 7 &&
    numberOfMinutes >= 0 &&
    numberOfMinutes <= 300;

  const formattedCurrentStepCount = renderCurrentStepCount(isUserTeetotal, questionCount);
  const isNextButtonEnabled = isQuestionRequired ? isQuestionAnswered : false;
  const isUnitKeyVisible = currentQuestion?.key === "two" || currentQuestion?.key === "three";
  const hasPreviousQuestion = questionCount >= 1;
  console.log("currentQuestion:", currentQuestion);
  console.log("questionCount:", questionCount);
  console.log("questionsList:", questionsList);
  return currentQuestion ? (
    <>
      <ProgressBar
        max={totalSteps}
        min={0}
        value={formattedCurrentStepCount}
        category={`${t(`questionnaire.${currentQuestion.key}.category`)}\n${getHeartsForQuestion(currentQuestion.key)}`}
      />
      <h2 className="u-margin-top-none u-margin-bottom" data-testid="title">
        {t(`questionnaire.${currentQuestion.key}.title`)}
      </h2>
      {t(`questionnaire.${currentQuestion.key}.subtitle`, { defaultValue: "" }) && (
        <h3 className="u-margin-top-none u-margin-bottom-xs">{t(`questionnaire.${currentQuestion.key}.subtitle`)}</h3>
      )}

      {currentQuestion?.questionType === "radio" ? (
        <div className={radioWrapperClasses} data-testid="questionnaire-radio">
          {currentQuestion.questions.map(question => (
            <Input
              className={classnames(
                "c-questionnaire__radio",
                (question.key === "question-three-4" || question.key === "question-three-5") &&
                  "c-questionnaire__radio--big"
              )}
              label={t(`questionnaire.${currentQuestion.key}.questions.${question.key}.label`)}
              labelSubtitle={
                question.subLabel ? t(`questionnaire.${currentQuestion.key}.questions.${question.key}.sublabel`) : null
              }
              id={question.key}
              key={question.key}
              type="radio"
              showLabel
              value={question.value}
              name="radio-select-card"
              checked={radio === question.value}
              onChange={() => {
                selectResponse(question);
              }}
              isCard
              tabIndex="0"
            />
          ))}
        </div>
      ) : currentQuestion?.questionType === "select" ? (
        <div ref={dropdownRef} className="u-flex u-flex--wrap u-margin-top-auto u-margin-bottom-huge">
          {currentQuestion.questions.map((question, index) => {
            const response = currentResponse?.value?.split(",") || ["0", "0"];
            const selectedValue = response[index] || "";
            const option = question.options?.[0];
            return (
              <div key={question.key} className="custom-select u-margin-right u-margin-bottom">
                <label className="c-questionnaire__label u-margin-bottom-xs">
                  {t(`questionnaire.${currentQuestion.key}.questions.${question.key}.label.${option.label}`)}
                </label>
                <select
                  className="c-questionnaire__dropdown-select"
                  style={{ marginBottom: "2rem" }}
                  size="1"
                  value={selectedValue}
                  onChange={e => {
                    const updated = [...response];
                    updated[index] = e.target.value;
                    const finalValue = updated.join(",");

                    onAnswer({
                      question: currentQuestion.key,
                      value: finalValue
                    });
                    setResponseSelected(true);
                  }}
                >
                  <option value="" disabled hidden>
                    {t(`questionnaire.${currentQuestion.key}.questions.${question.key}.placeholder`)}
                  </option>
                  {option.items.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ) : currentQuestion?.questionType === "time" ? (
        <>
          <div className="u-flex u-margin-top-auto u-margin-bottom-huge">
            {currentQuestion.questions.map(question => {
              return (question?.options ?? []).map((option, index) => {
                return (option.items ?? []).map((item, index) => {
                  let formattedValue = "";
                  switch (item) {
                    case "days":
                      formattedValue = numberOfDays;
                      break;
                    case "minutes":
                      formattedValue = numberOfMinutes;
                      break;
                    default:
                      formattedValue = "";
                  }

                  return (
                    <div className={`c-questionnaire__number ${errors[item] ? "has-error" : ""}`}>
                      <Input
                        className="c-input-number"
                        label={t(`questionnaire.${currentQuestion.key}.questions.${question.key}.label.${item}`)}
                        id={`question.key-${item}`}
                        key={`${currentQuestion.key}-${item}`}
                        type="number"
                        showLabel
                        ref={inputRefs[item]}
                        value={formattedValue !== null ? Number(formattedValue) : ""}
                        min={0}
                        max={maxValues[item]}
                        step={1}
                        name={`number-input-${item}`}
                        data-unit={item}
                        data-measurement={t(`questionnaire.measurements.${item}`)}
                        onChange={e => {
                          const val = Number(e.target.value);
                          const unit = e.target.dataset.unit;
                          let isValid = true;
                          if (unit === "days" && (val < 0 || val > 7)) {
                            isValid = false;
                            setErrors(prev => ({ ...prev, days: "Inserisci un valore tra 0 e 7" }));
                          } else if (unit === "minutes" && (val < 0 || val > 300)) {
                            isValid = false;
                            setErrors(prev => ({ ...prev, minutes: "Inserisci un valore tra 0 e 300" }));
                          } else {
                            setErrors(prev => ({ ...prev, [unit]: null }));
                          }
                          if (isValid) {
                            switch (unit) {
                              case "days":
                                setNumberOfDays(val);
                                break;
                              case "minutes":
                                setNumberOfMinutes(val);
                                break;
                              default:
                                break;
                            }
                            updateTimeResponse(item, val);
                          }
                        }}
                        increaseDecreaseValue={1}
                        tabIndex="0"
                      />
                      {errors[item] && (
                        <p className="c-input-error u-color-error u-font-xs u-margin-top-xs"> {errors[item]}</p>
                      )}
                    </div>
                  );
                });
              });
            })}
          </div>
        </>
      ) : (
        <>
          <TabHeader>
            {currentQuestion.questions.map(question => {
              return (question?.options ?? []).map((option, index) => {
                return (
                  <Button
                    className={classnames(
                      "c-button--tab c-tab-header__btn",
                      selectedUnit === option.label && "is-active"
                    )}
                    size="sm"
                    key={`${question.key}-${option.label}`}
                    aria-label={t(
                      `questionnaire.${currentQuestion.key}.questions.${question.key}.tabAltText.${option.label}`
                    )}
                    onClick={() => onTabChange(option)}
                  >
                    {t(`questionnaire.${currentQuestion.key}.questions.${question.key}.tab.${option.label}`)}
                  </Button>
                );
              });
            })}
          </TabHeader>

          <div className="u-flex u-margin-top-auto u-margin-bottom-huge">
            {currentQuestion.questions.map(question => {
              return (question?.options ?? []).map((option, index) => {
                return (option.items ?? []).map((item, index) => {
                  const responseValue = currentResponse?.value ? currentResponse.value : question.value;
                  const formattedValue = getStateValueForUnitType(item, responseValue);

                  return (
                    option.label === selectedUnit && (
                      <Input
                        className="c-questionnaire__number"
                        label={t(`questionnaire.${currentQuestion.key}.questions.${question.key}.label.${item}`)}
                        id={`question.key-${item}`}
                        key={`question.key-${item}`}
                        type="number"
                        showLabel
                        ref={item === "ft" || item === "st" ? numberInputRef : numberInputTwoRef}
                        data-raw={responseValue}
                        value={formattedValue}
                        name={`number-input-${item}`}
                        data-unit={item}
                        data-measurement={t(`questionnaire.measurements.${item}`)}
                        onChange={e => {
                          switch (e.target.dataset.unit) {
                            case "ft":
                              setNumberOfFeet(e.target.value);
                              break;
                            case "cm":
                              setNumberOfCm(e.target.value);
                              break;
                            case "kg":
                              setNumberOfKg(e.target.value);
                              break;
                            case "inch":
                              setNumberOfInches(e.target.value);
                              break;
                            case "st":
                              setNumberOfStone(e.target.value);
                              break;
                            case "lbs":
                              setNumberOfLbs(e.target.value);
                              break;
                            case "days":
                              setNumberOfDays(e.target.value);
                              break;
                            case "minutes":
                              setNumberOfMinutes(e.target.value);
                              break;
                            default:
                              selectResponse({ ...question, value: e.target.value });
                          }

                          if (e.target.dataset.unit === "ft" || e.target.dataset.unit === "inch") {
                            const totalCm = convertFeetAndInchesToCm(e.target.dataset.unit, e.target.value);
                            setNumberOfCm(Math.round(totalCm));

                            selectResponse({ ...question, value: totalCm.toString() });
                          } else if (e.target.dataset.unit === "st" || e.target.dataset.unit === "lbs") {
                            const totalKg = convertStoneAndLbsToKg(e.target.dataset.unit, e.target.value);
                            setNumberOfKg(totalKg);
                            selectResponse({ ...question, value: totalKg.toString() });
                          } else {
                            selectResponse({ ...question, value: e.target.value });
                          }
                        }}
                        increaseDecreaseValue={1}
                        tabIndex="0"
                      />
                    )
                  );
                });
              });
            })}
          </div>
        </>
      )}
      <div className={buttonWrapperClasses}>
        {hasPreviousQuestion && (
          <Button
            className="c-button--secondary u-margin-top-auto c-questionnaire__btn"
            onClick={() => decrementQuestion(questionCount, isUserTeetotal)}
          >
            {t("common.previous")}
          </Button>
        )}
        {isUnitKeyVisible && (
          <Button
            className="c-button--tertiary u-margin-top-auto c-questionnaire__btn"
            onClick={() => setModalVisible(true)}
          >
            {t("questionnaire.unitsKey")}
          </Button>
        )}

        {modalVisible && (
          <Modal onClose={() => setModalVisible(false)}>
            <UnitKey />
          </Modal>
        )}
        {isFinalQuestion && isViewResultsButtonEnabled ? (
          <Link to="/results" className={viewResultsButtonClasses}>
            {t("common.next")}
          </Link>
        ) : (
          <Button
            className="c-button c-button--primary u-margin-top-auto u-flex--align-self-end c-questionnaire__btn"
            disabled={
              isFinalQuestion ? !isViewResultsButtonEnabled : isTimeQuestion ? !isValidTime() : isNextButtonEnabled
            }
            onClick={() => incrementQuestion(questionCount, isUserTeetotal)}
            data-testid="next-button"
          >
            {t("common.next")}
          </Button>
        )}
      </div>
    </>
  ) : (
    <div data-testid="blank-questionnaire"></div>
  );
};

export default Questions;
