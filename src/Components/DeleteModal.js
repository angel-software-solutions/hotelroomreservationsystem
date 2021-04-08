import React from 'react'
import { Button } from 'antd'
import Modal from './Modal'

const DeleteModal = ({ visible, handleCancel, handleOk, name }) => {
    return (
        <Modal
            title='Delete Confirmation'
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button type='primary' style={{ color: '#fff', background: '#0f006c', borderColor: '#0f006c' }} onClick={handleOk}>
                    Delete
                </Button>,
                <Button onClick={handleCancel} style={{color: '#0f006c', background: '#fff', borderColor: '#0f006c' }}>
                    Cancel
                </Button>
            ]}
        >
            Are you sure you want to delete {name}?
        </Modal>
    )
}

export default DeleteModal
