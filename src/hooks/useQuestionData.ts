import { useEffect, useState } from 'react';
import { IQuestion } from 'types/questionnaire';
import { useQuiz } from '../context/QuizProviders';
import { usePostAnswer } from '../services/AssignmentService';
import { useNotification } from '../context/NotificationsProvider';

export const useQuestionData = (question: IQuestion) => {
  const { createNotification } = useNotification();
  const { mutateAsync } = usePostAnswer();
  const { goToNextQuestion } = useQuiz();
  const [ selectedOption, setSelectedOption ] = useState<number | null>(question?.response_id);

  const handleSelect = (option: number) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(question?.response_id);
  }, [ question ]);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!selectedOption) {
      createNotification({
        message: `Please select an option`,
        type: `error`
      });
      return;
    }
    try {
      await mutateAsync({
        question_id: question?.id,
        response_id: selectedOption
      });
      createNotification({
        message: `Answer saved successfully`,
        type: `success`
      });
      goToNextQuestion();
    } catch (e: any) {
      createNotification({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: e.response.data.message || e.message,
        type: `error`
      });
    }
  };

  return { selectedOption, handleSelect, handleSubmit };
};
