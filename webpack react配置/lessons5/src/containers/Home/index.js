import React, { Component } from 'react'
import { connect } from 'react-redux'

const Home = ({ userInfo }) => {
    return (
        <div>
            Home
            <div>
                这是redux中的数据
                {userInfo.name}
            </div>
        </div>
    );
}

const mapStateToProps = ({ userInfo }) => {
    return {
        userInfo
    }
}

const mapDispatchTopProps = {}
// 使用connect 关联redux
export default connect(mapStateToProps, mapDispatchTopProps)(Home)