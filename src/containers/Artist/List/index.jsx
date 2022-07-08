import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InputField from "../../../components/forms/InputField";
import {
  getArtists,
  getManageUserRequests,
} from "../../../redux/features/artist";
import { placeholder } from "$assets/images/placeholder.png";
import { ArtistListArtistWidget } from "./widgets/artist";
import styles from './index.module.scss';
import { ArtistListActions } from "./widgets/actions";

const ArtistList = (props) => {
  //store
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const artists = useSelector((state) => state.artist.artists);

  //effects
  useEffect(() => {
    dispatch(getArtists());
    const params = {
      requesting_user_id: user.user_id,
    };
    dispatch(getManageUserRequests(params));
  }, []);

  return (
    <div className="container">
      <div className="row py-3">
        <div className="col-lg-5">
          <div className="form-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search Artists"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className={`card ${styles.cardCustomized}`}>
          <div className={`card-body`}>
            <table className="table table-stripped text-light">
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist, i) => (
                  <tr>
                    <td>
                      <ArtistListArtistWidget artist={artist} />
                    </td>
                    <td>
                      <ArtistListActions artist={artist} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
