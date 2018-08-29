import React from 'react';
import {Modal, Header, Icon} from 'semantic-ui-react';

class LoginModal extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Modal onRequestClose={this.props.toggleModal} open={this.props.modalActive} onClose={this.props.toggleModal} size="mini">
                <div class="ui center aligned segment">
                <Header className='logInButton'>Log In With Instagram or Facebook</Header>
                    <a href="/auth/facebook"><i className="facebook square icon huge"/></a>
                    <a href="/auth/instagram"><i className="instagram icon huge"/></a>
                </div>
                </Modal>
            </div>
        )
        
    }

}

export default LoginModal;


/*

<a>
    <i
    className="facebook square icon huge"
    onClick={async () => {
        await this.props.loginWithFacebook()
        const { data } = await client.query({
        query: FIREBASE_USER,
        variables: { firebaseId: 'test' }
        })
        client.writeData({data: {userId: data.firebaseUser.id}})
        console.log('logged in with fb?')
        // this.props.handleUserId(data.firebaseUser.id)
    }}
    />
</a>

*/