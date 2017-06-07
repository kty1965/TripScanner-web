/**
 * Created by huy on 2017-05-24.
 */

import * as React from 'react';
import UserInfoChips from './userInfoChips';
import {
  Card, CardHeader, CardText, Divider
} from 'material-ui';
import ReviewList from './reviewList'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ToggleStarHalf from 'material-ui/svg-icons/toggle/star-half';
import { cyan500 } from 'material-ui/styles/colors';
import S from 'shorti'

class UserDetail extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    reviews: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const rateToHtml = []
    for (let i = 0; i < 5; i++) {
      if ((user.written_reviews_rate - i) >= 1)
        rateToHtml.push(<ToggleStar key={ i } color={ cyan500 }/>);
      else if ((user.written_reviews_rate - i) === 0.5)
        rateToHtml.push(<ToggleStarHalf key={ i } color={ cyan500 }/>);
      else
        rateToHtml.push(<ToggleStarBorder key={ i } color={ cyan500 }/>);
    }
    const introductionToHtml = user.introduction ? user.introduction.split('\n')
      .map((line, index) => {
        return (<span key={ index }>{ line }<br/></span>)
      }) : '';
    return (
      <div>
        <Card>
          <CardHeader
            title={ user.name }
            subtitle={ user.email }
            avatar={ user.image_thumb }
            children={
              <div style={S('pull-right text-center')}>
                { rateToHtml }
                <p> { user.written_reviews_count } 회 /
                  {
                    user.written_reviews_rate ?
                    user.written_reviews_rate + ' 점' : ' - 점'
                  }
                </p>
              </div>
            }
          />
          <Divider />
          <UserInfoChips owner={ user }/>
          <CardText>
            { introductionToHtml }
          </CardText>
        </Card>
        {
          user.written_reviews_count ?
            <ReviewList reviews={ this.props.reviews } /> :
            <Card style={S('mt-20')}>
              <CardHeader title="Review"/>
              <Divider />
              <CardText>
                Empty Reviews
              </CardText>
            </Card>
        }
      </div>
    )
  }
}
export default connect()(UserDetail);