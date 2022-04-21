var axios = require('axios');


export const getTargetsAndIndicatorsByGoalId = async (goalId) => {
    const response = await axios.get(`https://unstats.un.org/sdgapi/v1/sdg/Goal/${goalId}/Target/List?includechildren=true`);
    return response.data;
}
