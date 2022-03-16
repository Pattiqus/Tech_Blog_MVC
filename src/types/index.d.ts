interface Session {
  id: string;

  cookie: any;

  regenerate(callback: (err: any) => void): Session;

  /** Destroys the session and will unset the `req.session` property. Once complete, the `callback` will be invoked. */
  destroy(callback: (err: any) => void): Session;

  reload(callback: (err: any) => void): Session;

  /**
   * Resets the cookie's `maxAge` to `originalMaxAge`
   * @see Cookie
   */
  resetMaxAge(): Session;

  save(callback?: (err: any) => void): Session;

  touch(): Session;

  user_id: number;
  logged_in: boolean;
}

declare namespace Express {
  export interface Request {
    session: Session;
  }
}
