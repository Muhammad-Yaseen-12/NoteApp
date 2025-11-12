import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '@ant-design/v5-patch-for-react-19';
import {
  Input,
  Button,
  List,
  Card,
  Space,
  Typography,
  Tag,
  notification,
  Modal,
  Spin,
  Empty,
  Grid
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { confirm } = Modal
const { useBreakpoint } = Grid

function Dashboard() {
  const [inp, setInp] = useState("")
  const [reload, setReload] = useState(false)
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const screens = useBreakpoint()

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
    })
  }

  const getReq = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/notes`, { withCredentials: true })
      console.log("GET response:", res.data)
      setData(res.data)
    } catch (err) {
      console.log("GET Error:", err)
      showNotification('error', 'Error!', 'Failed to fetch notes. Please try again.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ADD or UPDATE
  const addOrUpdateNote = async () => {
    if (!inp.trim()) {
      showNotification('warning', 'Warning!', 'Please enter a note before adding.')
      return
    }

    try {
      setLoading(true)
      if (editId) {
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_LINK}/notes/${editId}`, { note: inp }, { withCredentials: true })
        console.log("Updated:", res.data)
        setEditId(null)
        showNotification('success', 'Success!', 'Note updated successfully!')
      } else {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/notes`, { note: inp }, { withCredentials: true })
        console.log("Added:", res.data)
        showNotification('success', 'Success!', 'Note added successfully!')
      }
      setInp("")
      setReload(!reload)
    } catch (err) {
      console.log("Add/Update Error:", err)
      showNotification('error', 'Error!', 'Failed to save note. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const deleteReq = async (id) => {
    confirm({
      title: 'Are you sure you want to delete this note?',
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/notes/${id}`, { withCredentials: true })
          console.log("DELETE response:", response.data)

          setEditId(null)
          setInp("")
          setReload(prev => !prev)

          showNotification('success', 'Success!', 'Note deleted successfully!')
        } catch (error) {
          console.error("DELETE Error:", error)
          console.error("Error response:", error.response)
          showNotification('error', 'Error!', `Failed to delete note: ${error.message}`)
        }
      },
      onCancel: () => {
        console.log("Delete cancelled by user")
      },
    })
  }

  const startEdit = async (id, noteData) => {
    console.log("Start edit for ID:", id, "Data:", noteData)
    setInp(noteData)
    setEditId(id)
    showNotification('info', 'Edit Mode', 'You are now editing the note. Update or cancel to finish.')
  }

  const cancelEdit = () => {
    setEditId(null)
    setInp("")
    showNotification('info', 'Edit Cancelled', 'Edit mode has been cancelled.')
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setReload(!reload)
  }

  useEffect(() => {
    getReq()
  }, [reload])

  // Debug: Log when data changes
  useEffect(() => {
    console.log("Data updated:", data)
  }, [data])

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gray-50 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="text-center mb-4 shadow-sm border-0">
            <Title level={screens.xs ? 3 : 2} className="!mb-2 text-blue-600">
              Note App
            </Title>
            <Text type="secondary" className={screens.xs ? "text-sm" : "text-lg"}>
              Organize your notes efficiently
            </Text>
          </Card>

          {/* Input Section */}
          <Card
            className="mb-4 shadow-sm border-0"
            title={
              <Space direction={screens.xs ? "vertical" : "horizontal"} align={screens.xs ? "start" : "center"}>
                {editId ? (
                  <Tag icon={<EditOutlined />} color="orange">
                    Editing Mode
                  </Tag>
                ) : (
                  <Tag icon={<PlusOutlined />} color="blue">
                    Add New Note
                  </Tag>
                )}
                <Text type="secondary" className={screens.xs ? "text-xs" : ""}>
                  {editId ? 'Update existing note' : 'Create a new note'}
                </Text>
              </Space>
            }
          >
            <div className={screens.xs ? "space-y-2" : "flex gap-2"}>
              <Input
                size={screens.xs ? "middle" : "large"}
                placeholder="Enter your note here..."
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                onPressEnter={addOrUpdateNote}
                prefix={<EditOutlined className="text-gray-400" />}
                disabled={loading}
                className={screens.xs ? "w-full" : "flex-1"}
              />
              <div className={screens.xs ? "flex gap-2" : "flex gap-2"}>
                <Button
                  type="primary"
                  size={screens.xs ? "middle" : "large"}
                  icon={editId ? <CheckOutlined /> : <PlusOutlined />}
                  onClick={addOrUpdateNote}
                  loading={loading}
                  style={{
                    background: editId ? '#faad14' : '#1890ff',
                    borderColor: editId ? '#faad14' : '#1890ff'
                  }}
                  className={screens.xs ? "flex-1" : ""}
                >
                  {screens.xs ? (editId ? 'Update' : 'Add') : (editId ? 'Update' : 'Add Note')}
                </Button>
                {editId && (
                  <Button
                    size={screens.xs ? "middle" : "large"}
                    icon={screens.xs ? <CloseOutlined /> : null}
                    onClick={cancelEdit}
                    disabled={loading}
                    className={screens.xs ? "flex-1" : ""}
                  >
                    {screens.xs ? '' : 'Cancel'}
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Notes List */}
          <Card
            className="shadow-sm border-0"
            title={
              <Space direction={screens.xs ? "vertical" : "horizontal"} align={screens.xs ? "start" : "center"}>
                <Text strong>Your Notes</Text>
                {data.length > 0 && (
                  <Tag color="blue">{data.length} {data.length === 1 ? 'note' : 'notes'}</Tag>
                )}
              </Space>
            }
            extra={
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={refreshing}
                size={screens.xs ? "small" : "middle"}
              >
                {screens.xs ? '' : 'Refresh'}
              </Button>
            }
          >
            {loading && !refreshing ? (
              <div className="text-center py-8">
                <Spin size="large" />
                <div className="mt-4">
                  <Text type="secondary">Loading notes...</Text>
                </div>
              </div>
            ) : data.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Text type="secondary">No notes yet. Add your first note above!</Text>
                }
              />
            ) : (
              <List
                dataSource={data}
                renderItem={(noteItem, index) => (
                  <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors"
                    actions={
                      screens.xs ? [
                        <Space.Compact key="actions" direction="vertical" size="small">
                          <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => startEdit(noteItem._id, noteItem.note)}
                            disabled={loading}
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => deleteReq(noteItem._id)}
                            disabled={loading}
                            size="small"
                          >
                            Delete
                          </Button>
                        </Space.Compact>
                      ] : [
                        <Button
                          key="edit"
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => startEdit(noteItem._id, noteItem.note)}
                          disabled={loading}
                        >
                          Edit
                        </Button>,
                        <Button
                          key="delete"
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteReq(noteItem._id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      ]
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <div className={`${screens.xs ? 'w-5 h-5' : 'w-6 h-6'} bg-blue-100 rounded-full flex items-center justify-center`}>
                          <Text strong className="text-blue-600 text-xs">
                            {index + 1}
                          </Text>
                        </div>
                      }
                      title={
                        <Text
                          className={`${editId === noteItem._id ? 'text-orange-500 font-semibold' : ''} ${screens.xs ? 'text-sm' : ''}`}
                        >
                          {noteItem.note}
                        </Text>
                      }
                      description={screens.xs && editId === noteItem._id && (
                        <Tag color="orange" size="small" className="mt-1">
                          Editing
                        </Tag>
                      )}
                    />
                    {!screens.xs && editId === noteItem._id && (
                      <Tag color="orange" icon={<EditOutlined />}>
                        Currently Editing
                      </Tag>
                    )}
                  </List.Item>
                )}
              />
            )}
          </Card>

          {/* Footer */}
          <div className="text-center mt-4">
            <Text type="secondary" className={screens.xs ? "text-xs" : ""}>
              Total {data.length} {data.length === 1 ? 'note' : 'notes'} •
              {editId ? ' Editing mode' : ' Ready to add'}
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard