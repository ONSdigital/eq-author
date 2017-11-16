import { compose } from "react-apollo";

import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import AnswerProperties from "components/AnswerProperties";

export default compose(withUpdateAnswer)(AnswerProperties);
