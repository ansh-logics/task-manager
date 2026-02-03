export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-2">
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-gray-800 truncate">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
            {task.status}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
