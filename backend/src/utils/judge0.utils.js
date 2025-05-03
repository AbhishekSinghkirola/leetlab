import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve(), ms));

export const pollBatchResults = async (tokens) => {
  try {
    while (true) {
      const { data } = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
        }
      );

      const results = data.submissions;

      const isAllDone = results.every(
        (r) => r?.status.id !== 1 && r?.status.id !== 2
      );

      if (isAllDone) return results;
      await sleep(1000);
    }
  } catch (error) {
    throw error;
  }
};

export const verifyReferenceSolutions = async (
  referenceSolutions,
  testcases
) => {
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new ApiError(404, "Language Id does not exist.");
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResponse = await submitBatch(submissions);
      const tokens = submissionResponse.map((res) => res.token);

      const submissionResults = await pollBatchResults(tokens);

      for (let i = 0; i < submissionResults.length; i++) {
        const result = submissionResults[i];

        if (result.status.id !== 3) {
          throw new ApiError(
            400,
            `Testcase ${i + 1} failed for language ${language}`
          );
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
