import StatusUpdates from '../../components/StatusUpdates';

const StatusUpdatesEdit = ( { attributes } ) => {
	const className = attributes.className || 'wp-block-fireberg-status-updates';

	return (
		<div className={className}>
			<StatusUpdates />
		</div>
	);
};

export default StatusUpdatesEdit;
