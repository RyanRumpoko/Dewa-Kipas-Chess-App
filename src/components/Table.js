export default function Table(props) {
  const { data } = props;
  // console.log(data.data, "<<<<<< TABLE");
  return (
    <tr>
      <th scope="row">{data.i + 1}</th>
      <td>{data.data.username}</td>
      <td>{data.data.eloRating}</td>
    </tr>
  );
}
